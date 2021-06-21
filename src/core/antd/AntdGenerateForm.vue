<template>
  <div class="fc-style">
    <a-form
      ref="generateForm"
      :model="model"
      :layout="widgetForm.config.layout"
      :labelAlign="widgetForm.config.labelAlign"
      :labelCol="widgetForm.config.labelCol"
      :hideRequiredMark="widgetForm.config.hideRequiredMark"
    >
      <template v-for="(element, index) of widgetForm.list">
        <template v-if="element.type === 'grid'">
          <a-row
            type="flex"
            v-if="element.key"
            :key="element.key"
            :gutter="element.options.gutter ?? 0"
            :justify="element.options.justify"
            :align="element.options.align"
          >
          <!-- {{element.columns}} -->
            <a-col
              v-for="(col, colIndex) of element.columns"
              :key="colIndex"
              :span="col.span ?? 0"
            >
              <AntdGenerateFormItem
                v-for="colItem of col.list"
                v-model:model="model"
                :key="colItem.key"
                :element="colItem"
                :config="data.config"
                :disabled="disabled"
              />
            </a-col>
            <a-button v-if="element.dynamic" type="dashed"  @click="handleAdd(element)">
              增加
            </a-button>
          </a-row>
        </template>
        <AntdGenerateFormItem
          v-else
          v-model:widgetForm="widgetForm"
          v-model:model="model"
          :key="element.key"
          :element="widgetForm.list[index]"
          :config="data.config"
          :disabled="disabled"
        />
      </template>
    </a-form>
  </div>
</template>

<script lang="ts">
import { v4 } from 'uuid'
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { message } from 'ant-design-vue'
import AntdGenerateFormItem from './AntdGenerateFormItem.vue'
import { antd } from '@/config'

export default defineComponent({
  name: 'AntdGenerateForm',
  components: {
    AntdGenerateFormItem
  },
  props: {
    data: {
      type: Object,
      default: antd.widgetForm
    },
    value: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const handleWidgetForm = (widgetForm: any) => {
      const widgetFormT = JSON.parse(JSON.stringify(widgetForm))
      const typeList = ['grid']

      const excludeTypeList: any[] = []

      const handleWidgetFormColumnsList = (list: any[]):any[] => {
        return list.map(v => {
          return {
            ...v,
            list: handleWidgetFormList(v.list)
          }
        })
      }

      const handleWidgetFormList = (list: any[]):any[] => {
        return list.map(v => {
          if (typeList.includes(v.type)) {
            return {
              ...v,
              columns: handleWidgetFormColumnsList(v.columns)
            }
          } else if (!excludeTypeList.includes(v.type)) {
            return {
              ...v,
              options: v.options
            }
          } else {
            return v
          }
        })
      }

      return {
        ...widgetFormT,
        list: handleWidgetFormList(widgetFormT.list)
      }
    }

    const state = reactive({
      generateForm: null as any,
      model: {} as any,
      rules: {} as any,
      widgetForm: handleWidgetForm(props.data ?? antd.widgetForm)
    })

    const generateModel = (list: any[]) => {
      for (let index = 0; index < list.length; index++) {
        const model = list[index].model
        if (!model) {
          return
        }
        if (list[index].type === 'grid') {
          list[index].columns.forEach((col: any) => generateModel(col.list))
        } else {
          if (props.value && Object.keys(props.value).includes(model)) {
            state.model[model] = [props.value[model] ?? null]
          } else {
            // 检测如果原有model存在值则就从保留赋值
            state.model[model] = state.model[model] ?? [list[index].options.defaultValue ?? null]
          }

          state.rules[model] = list[index].options.rules
        }
      }
    }

    const generateOptions = (list: any[]) => {
      list.forEach(item => {
        if (item.type === 'grid') {
          item.columns.forEach((col: any) => generateOptions(col.list))
        } else {
          if (item.options.remote && item.options.remoteFunc) {
            fetch(item.options.remoteFunc)
              .then(resp => resp.json())
              .then(json => {
                if (json instanceof Array) {
                  item.options.remoteOptions = json.map(data => ({
                    label: data[item.options.props.label],
                    value: data[item.options.props.value],
                    children: data[item.options.props.children]
                  }))
                }
              })
          }
        }
      })
    }

    let colMap:any = {}

    const handleAdd = (item: any) => {
      if (!colMap[item.key]) {
        colMap[item.key] = JSON.parse(JSON.stringify(item))
      }

      const colT = colMap[item.key]

      item.columns.push(...colT.columns.map((col: any) => {
        return {
          ...col,
          list: col.list.map((v: any) => {
            const uuid = v4().replaceAll('-', '')

            return {
              ...v,
              key: uuid,
              model: `${uuid}/${v.model}`
            }
          })
        }
      }))

      generateModel(state.widgetForm.list)
      generateOptions(state.widgetForm.list)
    }

    watch(
      () => props.data,
      () => {
        state.widgetForm = handleWidgetForm(props.data ?? antd.widgetForm)
        state.model = {}
        state.rules = {}
        colMap = {}
        generateModel(state.widgetForm.list)
        generateOptions(state.widgetForm.list)
      },
      { deep: true, immediate: true }
    )

    onMounted(() => {
      generateModel(state.widgetForm?.list ?? [])
      generateOptions(state.widgetForm?.list ?? [])
    })

    /**
     * @description:  处理保存获取的数据格式(转换为嵌套json)
     * @param {*}
     * @return {*}
     */
    const handleSaveData = (list: any[]) => {
      const model: any = {}

      list.forEach((item: any) => {
        if (item.type === 'grid') {
          model[item.model] = item.columns.map((v: any) => {
            const rowModel = v.list.map((row: any) => {
              const model:any = {}
              if (row.model.includes('/')) {
                const key = row.model.split('/')[1]
                model[key] = state.model[row.model]
              } else {
                model[row.model] = state.model[row.model]
              }
              return model
            })
            return rowModel
          })
        } else {
          model[item.model] = state.model[item.model]
        }
      })

      return model
    }

    const getData = () => {
      return new Promise((resolve, reject) => {
        state.generateForm
          .validate()
          .then((validate: boolean) => {
            if (validate) {
              resolve(handleSaveData(state.widgetForm.list))
            } else {
              message.error('验证失败')
            }
          })
          .catch((error: Error) => {
            reject(error)
          })
      })
    }

    const reset = () => {
      state.generateForm.resetFields()
    }

    return {
      ...toRefs(state),
      getData,
      reset,
      handleAdd
    }
  }
})
</script>
