<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-06-18 10:40:14
 * @LastEditTime: 2021-06-21 15:51:52
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <a-form-item
    v-for="(item, i) in data"
    :label="i === 0 ? element.label : ' '"
    :name="[element.model, i]"
    :key="element.key + i"
    :rules="element.options.rules ?? {}"
  >
    <template v-if="element.type === 'input'">
      <a-input
        v-model:value="data[i]"
        :size="config.size"
        :style="{ width: element.options.width }"
        :placeholder="element.options.placeholder"
        :maxlength="parseInt(element.options.maxlength)"
        :prefix="element.options.prefix"
        :suffix="element.options.suffix"
        :addonBefore="element.options.addonBefore"
        :addonAfter="element.options.addonAfter"
        :allowClear="element.options.allowClear"
        :readonly="element.options.readonly"
        :disabled="disabled || element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'password'">
      <a-input-password
        v-model:value="data[i]"
        :size="config.size"
        :style="{ width: element.options.width }"
        :placeholder="element.options.placeholder"
        :maxlength="element.options.maxlength"
        :prefix="element.options.prefix"
        :suffix="element.options.suffix"
        :addonBefore="element.options.addonBefore"
        :addonAfter="element.options.addonAfter"
        :allowClear="element.options.allowClear"
        :disabled="disabled || element.options.disabled"
        :readonly="element.options.readonly"
        :visibilityToggle="element.options.visibilityToggle"
      />
    </template>

    <template v-if="element.type === 'textarea'">
      <a-textarea
        style="resize: none"
        v-model:value="data[i]"
        :size="config.size"
        :rows="element.options.rows"
        :style="{ width: element.options.width }"
        :placeholder="element.options.placeholder"
        :maxlength="element.options.maxlength"
        :showCount="element.options.showCount"
        :autoSize="element.options.autoSize"
        :allowClear="element.options.allowClear"
        :readonly="element.options.readonly"
        :disabled="disabled || element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'number'">
      <a-input-number
        v-model:value="data[i]"
        :size="config.size"
        :style="{ width: element.options.width }"
        :max="element.options.max"
        :min="element.options.min"
        :disabled="disabled || element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'radio'">
      <a-radio-group
        v-model:value="data[i]"
        :size="config.size"
        :style="{ width: element.options.width }"
        :disabled="disabled || element.options.disabled"
      >
        <a-radio
          v-for="item of element.options.remote
            ? element.options.remoteOptions
            : element.options.options"
          :key="item.value"
          :value="item.value"
          :style="{
            display: element.options.inline ? 'inline-block' : 'block'
          }"
          >{{ element.options.showLabel ? item.label : item.value }}</a-radio
        >
      </a-radio-group>
    </template>

    <template v-if="element.type === 'checkbox'">
      <a-checkbox-group
        v-model:value="data[i]"
        :style="{ width: element.options.width }"
        :disabled="disabled || element.options.disabled"
      >
        <a-checkbox
          v-for="item of element.options.remote
            ? element.options.remoteOptions
            : element.options.options"
          :key="item.value"
          :value="item.value"
          :style="{
            display: element.options.inline ? 'inline-block' : 'block'
          }"
          >{{ element.options.showLabel ? item.label : item.value }}</a-checkbox
        >
      </a-checkbox-group>
    </template>

    <template v-if="element.type === 'time'">
      <a-time-picker
        v-model:value="data[i]"
        :size="config.size"
        :placeholder="element.options.placeholder"
        :inputReadOnly="element.options.readonly"
        :allowClear="element.options.allowClear"
        :format="element.options.format"
        :valueFormat="element.options.valueFormat"
        :disabled="disabled || element.options.disabled"
        :style="{ width: element.options.width }"
      />
    </template>

    <template v-if="element.type === 'date'">
      <a-date-picker
        v-model:value="data[i]"
        :size="config.size"
        :placeholder="element.options.placeholder"
        :inputReadOnly="element.options.readonly"
        :allowClear="element.options.allowClear"
        :format="element.options.format"
        :disabled="disabled || element.options.disabled"
        :style="{ width: element.options.width }"
      />
    </template>

    <template v-if="element.type === 'rate'">
      <a-rate
        v-model:value="data[i]"
        :count="element.options.max"
        :allowHalf="element.options.allowHalf"
        :allowClear="element.options.allowClear"
        :disabled="disabled || element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'select'">
      <a-select
        v-model:value="data[i]"
        :size="config.size"
        :mode="element.options.mode"
        :placeholder="element.options.placeholder"
        :filter-option="handleFilterOption"
        :allowClear="element.options.clearable"
        :showSearch="element.options.showSearch"
        :disabled="disabled || element.options.disabled"
        :style="{ width: element.options.width }"
      >
        <a-select-option
          v-for="item of element.options.remote
            ? element.options.remoteOptions
            : element.options.options"
          :key="item.value"
          :value="item.value"
          :label="element.options.showLabel ? item.label : item.value"
        >
          {{ element.options.showLabel ? item.label : item.value }}
        </a-select-option>
      </a-select>
    </template>

    <template v-if="element.type === 'switch'">
      <a-switch
        v-model:checked="data[i]"
        :size="config.size === 'large' ? 'default' : config.size"
        :checkedChildren="element.options.checkedChildren"
        :unCheckedChildren="element.options.unCheckedChildren"
        :disabled="disabled || element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'slider'">
      <a-slider
        v-model:value="data[i]"
        :min="element.options.min"
        :max="element.options.max"
        :step="element.options.step"
        :range="element.options.range"
        :reverse="element.options.reverse"
        :disabled="disabled || element.options.disabled"
        :style="{ width: element.options.width }"
      />
    </template>

    <template v-if="element.type == 'text'">
      <span>{{ element.options.defaultValue }}</span>
    </template>

    <template v-if="element.type === 'img-upload'">
      <a-upload
        :name="element.options.file"
        :action="element.options.action"
        :accept="element.options.accept"
        :file-list="data[i]"
        :listType="element.options.listType"
        :multiple="element.options.multiple"
        :disabled="disabled || element.options.disabled"
        @change="handleUploadChange"
      >
        <SvgIcon
          v-if="element.options.listType === 'picture-card'"
          iconClass="insert"
        />
        <a-button v-else>
          <SvgIcon iconClass="img-upload" style="margin-right: 10px;" />
          点击上传
        </a-button>
      </a-upload>
    </template>

    <template v-if="element.type === 'richtext-editor'">
      <RichTextEditor
        v-model:value="data[i]"
        :disable="disabled || element.options.disabled"
        :style="{ width: element.options.width }"
      />
    </template>

    <template v-if="element.type === 'cascader'">
      <a-cascader
        v-model:value="data[i]"
        :size="config.size"
        :options="element.options.remoteOptions"
        :placeholder="element.options.placeholder"
        :allowClear="element.options.allowClear"
        :disabled="disabled || element.options.disabled"
        :style="{ width: element.options.width }"
      />
    </template>

  </a-form-item>
  <a-form-item v-if="element.dynamic">
    <a-button type="dashed"  @click="handleAdd">
      增加
    </a-button>
  </a-form-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'
import { WidgetForm } from '@/config/antd'

export default defineComponent({
  name: 'AntdGenerateFormItem',
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
    },
    widgetForm: {
      type: Object,
      required: true
    }
  },
  emits: ['update:model', 'update:widgetForm'],
  setup(props, context) {
    console.log('创建context', props.model)
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

    const handleUploadChange = ({ fileList }: any) => {
      data.value = fileList
    }

    const handleAdd = () => {
      const defaultValue = props.element.options.defaultValue ?? null

      data.value.push(defaultValue)
    }

    return {
      data,
      handleFilterOption,
      handleUploadChange,
      handleAdd
    }
  }
})
</script>
