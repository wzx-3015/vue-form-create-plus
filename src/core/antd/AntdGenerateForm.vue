<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-06-21 18:29:36
 * @LastEditTime: 2021-06-22 18:44:37
 * @LastEditors: @Xin (834529118@qq.com)
-->
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
          >
            <a-col
              :span="24"
              v-for="(row, rowIndex) of element.columns"
              :key="element.key + rowIndex"
              :class="{
                'custom-group': element.dynamic
              }">
              <a-row
                type="flex"
                :gutter="element.options.gutter ?? 0"
                :justify="element.options.justify"
                :align="element.options.align"
                class="group-content"
              >
                <a-col
                  v-for="(col, colIndex) of row"
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
              </a-row>
              <div class="group-operation" v-if="element.dynamic && element.columns.length > 1">
                <a-button
                  shape="circle"
                  type="dashed"
                  :disabled="rowIndex === 0"
                  @click="handleReomveGroup(index, rowIndex)"
                >
                  <template #icon>
                    <MinusOutlined />
                  </template>
                </a-button>
              </div>
            </a-col>
            <a-button class="group-add-btn" v-if="element.dynamic" type="dashed" block @click="handleAdd(element)">
              <template #icon>
                <PlusOutlined />
              </template>
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
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue'
import { v4 } from 'uuid'
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { message } from 'ant-design-vue'
import AntdGenerateFormItem from './AntdGenerateFormItem.vue'
import { antd } from '@/config'

export default defineComponent({
  name: 'AntdGenerateForm',
  components: {
    AntdGenerateFormItem,
    PlusOutlined,
    MinusOutlined
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
              columns: [handleWidgetFormColumnsList(v.columns)]
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
          list[index].columns.forEach((row: any) => row.forEach((col: any) => generateModel(col.list)))
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
          item.columns.forEach((row: any) => row.forEach((col: any) => generateOptions(col.list)))
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

      const copyData = colT.columns[0].map((col: any) => {
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
      })

      item.columns.push(copyData)

      generateModel(state.widgetForm.list)
      generateOptions(state.widgetForm.list)
    }

    /**
     * @description:  移除组数据组
     * @param {number} index list数据索引
     * @param {number} colIndex  行数据索引
     * @return {*}
     */
    const handleReomveGroup = (index: number, colIndex: number) => {
      state.widgetForm.list[index].columns.splice(colIndex, 1)
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
          model[item.model] = item.columns.map((row: any) => {
            return row.map((col: any) => {
              const rowModel:any = {}
              col.list.forEach((v: any) => {
                if (v.model.includes('/')) {
                  const key = v.model.split('/')[1]
                  rowModel[key] = state.model[v.model]
                } else {
                  rowModel[v.model] = state.model[v.model]
                }
              })
              return rowModel
            })
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
      handleAdd,
      handleReomveGroup
    }
  }
})
</script>
