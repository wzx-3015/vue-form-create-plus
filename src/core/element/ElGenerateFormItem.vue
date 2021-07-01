<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-06-21 18:29:36
 * @LastEditTime: 2021-07-01 11:21:34
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <el-form-item
    v-for="(item, i) in data"
    :label="i === 0 ? element.label : ' '"
    :prop="element.model + '.' + i"
    :key="element.key + i"
    :rules="element.options.rules ?? {}"
    :class="{
      'group-form-item': element.dynamic
    }"
  >
    <div class="form-item-content">
      <template v-if="element.type === 'input'">
        <el-input
          v-model="data[i]"
          :style="{ width: element.options.width }"
          :placeholder="element.options.placeholder"
          :maxlength="parseInt(element.options.maxlength)"
          :clearable="element.options.clearable"
          :readonly="element.options.readonly"
          :disabled="disabled || element.options.disabled"
        >
          <template #prefix v-if="element.options.prefix">
            {{ element.options.prefix }}
          </template>
          <template #suffix v-if="element.options.suffix">
            {{ element.options.suffix }}
          </template>
          <template #prepend v-if="element.options.prepend">
            {{ element.options.prepend }}
          </template>
          <template #append v-if="element.options.append">
            {{ element.options.append }}
          </template>
        </el-input>
      </template>

      <template v-if="element.type === 'password'">
        <el-input
          v-model="data[i]"
          :style="{ width: element.options.width }"
          :placeholder="element.options.placeholder"
          :maxlength="parseInt(element.options.maxlength)"
          :clearable="element.options.clearable"
          :disabled="disabled || element.options.disabled"
          :readonly="element.options.readonly"
          :show-password="element.options.showPassword"
        >
          <template #prefix v-if="element.options.prefix">
            {{ element.options.prefix }}
          </template>
          <template #suffix v-if="element.options.suffix">
            {{ element.options.suffix }}
          </template>
          <template #prepend v-if="element.options.prepend">
            {{ element.options.prepend }}
          </template>
          <template #append v-if="element.options.append">
            {{ element.options.append }}
          </template>
        </el-input>
      </template>

      <template v-if="element.type === 'textarea'">
        <el-input
          type="textarea"
          resize="none"
          v-model="data[i]"
          :rows="element.options.rows"
          :style="{ width: element.options.width }"
          :placeholder="element.options.placeholder"
          :maxlength="parseInt(element.options.maxlength)"
          :show-word-limit="element.options.showWordLimit"
          :autosize="element.options.autosize"
          :clearable="element.options.clearable"
          :readonly="element.options.readonly"
          :disabled="disabled || element.options.disabled"
        />
      </template>

      <template v-if="element.type === 'number'">
        <el-input-number
          v-model="data[i]"
          :style="{ width: element.options.width }"
          :max="element.options.max"
          :min="element.options.min"
          :disabled="disabled || element.options.disabled"
        />
      </template>

      <template v-if="element.type === 'radio'">
        <el-radio-group
          v-model="data[i]"
          :style="{ width: element.options.width }"
          :disabled="disabled || element.options.disabled"
        >
          <el-radio
            v-for="item of element.options.remote
              ? element.options.remoteOptions
              : element.options.options"
            :key="item.value"
            :label="item.value"
            :style="{
              display: element.options.inline ? 'inline-block' : 'block'
            }"
            >{{ element.options.showLabel ? item.label : item.value }}</el-radio
          >
        </el-radio-group>
      </template>

      <template v-if="element.type === 'checkbox' && data">
        <el-checkbox-group
          v-model="data[i]"
          :style="{ width: element.options.width }"
          :disabled="disabled || element.options.disabled"
        >
          <el-checkbox
            v-for="item of element.options.remote
              ? element.options.remoteOptions
              : element.options.options"
            :key="item.value"
            :value="item.value"
            :style="{
              display: element.options.inline ? 'inline-block' : 'block'
            }"
            >{{
              element.options.showLabel ? item.label : item.value
            }}</el-checkbox
          >
        </el-checkbox-group>
      </template>

      <template v-if="element.type === 'time'">
        <el-time-picker
          v-model="data[i]"
          :placeholder="element.options.placeholder"
          :readonly="element.options.readonly"
          :editable="element.options.editable"
          :clearable="element.options.clearable"
          :format="element.options.format"
          :disabled="disabled || element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type === 'date'">
        <el-date-picker
          v-model="data[i]"
          :placeholder="element.options.placeholder"
          :readonly="element.options.readonly"
          :editable="element.options.editable"
          :clearable="element.options.clearable"
          :format="element.options.format"
          :disabled="disabled || element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type === 'rate'">
        <el-rate
          v-model="data[i]"
          :max="element.options.max"
          :allowHalf="element.options.allowHalf"
          :disabled="disabled || element.options.disabled"
        />
      </template>

      <template v-if="element.type === 'select'">
        <el-select
          v-model="data[i]"
          :multiple="element.options.multiple"
          :placeholder="element.options.placeholder"
          :clearable="element.options.clearable"
          :filterable="element.options.filterable"
          :disabled="disabled || element.options.disabled"
          :style="{ width: element.options.width }"
        >
          <el-option
            v-for="item of element.options.remote
              ? element.options.remoteOptions
              : element.options.options"
            :key="item.value"
            :value="item.value"
            :label="element.options.showLabel ? item.label : item.value"
          />
        </el-select>
      </template>

      <template v-if="element.type === 'switch'">
        <el-switch
          v-model="data[i]"
          :modelValue="element.options.defaultValue"
          :active-text="element.options.activeText"
          :inactive-text="element.options.inactiveText"
          :disabled="disabled || element.options.disabled"
        />
      </template>

      <template v-if="element.type === 'slider'">
        <el-slider
          v-model="data[i]"
          :min="element.options.min"
          :max="element.options.max"
          :step="element.options.step"
          :range="element.options.range"
          :disabled="disabled || element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type == 'text'">
        <span>{{ element.options.defaultValue }}</span>
      </template>

      <template v-if="element.type === 'img-upload'">
        <el-upload
          :name="element.options.file"
          :action="element.options.action"
          :accept="element.options.accept"
          :file-list="element.options.defaultValue"
          :listType="element.options.listType"
          :multiple="element.options.multiple"
          :limit="element.options.limit"
          :disabled="disabled || element.options.disabled"
          :on-success="handleUploadSuccess"
        >
          <SvgIcon
            v-if="element.options.listType === 'picture-card'"
            iconClass="insert"
          />
          <el-button v-else>
            <SvgIcon iconClass="img-upload" style="margin-right: 10px;" />
            点击上传
          </el-button>
        </el-upload>
      </template>

      <template v-if="element.type === 'richtext-editor'">
        <RichTextEditor
          v-model:value="data[i]"
          :disable="disabled || element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>

      <template v-if="element.type === 'cascader'">
        <el-cascader
          v-model="data[i]"
          :options="element.options.remoteOptions"
          :placeholder="element.options.placeholder"
          :filterable="element.options.filterable"
          :clearable="element.options.clearable"
          :disabled="disabled || element.options.disabled"
          :style="{ width: element.options.width }"
        />
      </template>
    </div>

    <div class="remove-from-item-btn">
      <el-button
        size="small"
        circle
        icon="el-icon-minus"
        v-if="data.length > 1 && element.dynamic"
        :disabled="i === 0"
        @click="removeFromItem(i)" />
    </div>
  </el-form-item>

  <el-form-item v-if="element.dynamic">
    <el-button
      v-if="element.dynamic"
      class="group-add-btn"
      style="width: 100%"
      size="small"
      @click="handleAdd"
      icon="el-icon-plus" />
  </el-form-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'
import { WidgetForm } from '@/config/element'

export default defineComponent({
  name: 'ElGenerateFormItem',
  components: {
    SvgIcon,
    RichTextEditor
  },
  props: {
    config: {
      type: Object as PropType<WidgetForm['config']>,
      required: true
    },
    element: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:model'],
  setup(props, context) {
    const data = computed({
      get: () => props.model[props.element.model],
      set: val => {
        const model = JSON.parse(JSON.stringify(props.model))
        model[props.element.model] = val
        context.emit('update:model', model)
      }
    })

    const handleFilterOption = (input: string, option: { label: string }) =>
      option.label.toLowerCase().includes(input)

    const handleUploadSuccess = (_res: any, _file: any, fileList: any[]) => {
      data.value[0] = fileList
    }

    const handleAdd = () => {
      const defaultValue = props.element.options.defaultValue ?? null

      data.value.push(defaultValue)
    }

    const removeFromItem = (index: number) => {
      data.value.splice(index, 1)
    }

    return {
      data,
      handleFilterOption,
      handleUploadSuccess,
      removeFromItem,
      handleAdd
    }
  }
})
</script>
