/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-06-18 10:40:14
 * @LastEditTime: 2021-06-21 15:59:16
 * @LastEditors: @Xin (834529118@qq.com)
 */
export interface Rules {
  trigger: string
  enum: string
  len?: number
  max?: number
  message: string
  min?: number
  pattern: string
  required: boolean
  type: string
}

export interface WidgetForm {
  list: any[]
  config: {
    size: string
    hideRequiredMark: boolean
    layout: string
    labelAlign: string
    labelCol: {
      span: number
      offset: number
    }
  }
}

const rules: Rules = {
  trigger: 'blur',
  enum: '',
  len: undefined,
  max: undefined,
  message: '',
  min: undefined,
  pattern: '',
  required: false,
  type: 'any'
}

export const widgetForm: WidgetForm = {
  list: [],
  config: {
    size: 'default',
    hideRequiredMark: false,
    layout: 'horizontal',
    labelAlign: 'right',
    labelCol: {
      span: 3,
      offset: 0
    }
  }
}

export const basicComponents = [
  {
    label: '单行文本',
    type: 'input',
    dynamic: false,
    options: {
      width: '100%',
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      prefix: '',
      suffix: '',
      addonBefore: '',
      addonAfter: '',
      disabled: false,
      allowClear: false,
      readonly: false,
      rules
    }
  },
  {
    label: '密码框',
    type: 'password',
    options: {
      width: '100%',
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      prefix: '',
      suffix: '',
      addonBefore: '',
      addonAfter: '',
      visibilityToggle: true,
      disabled: false,
      allowClear: false,
      readonly: false,
      rules
    }
  },
  {
    label: '多行文本',
    type: 'textarea',
    dynamic: false,
    options: {
      width: '100%',
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      rows: 4,
      autoSize: false,
      showCount: false,
      disabled: false,
      allowClear: false,
      readonly: false,
      rules
    }
  },
  {
    label: '计数器',
    type: 'number',
    dynamic: false,
    options: {
      width: '',
      defaultValue: 0,
      min: 0,
      max: 100,
      step: 1,
      readonly: false,
      disabled: false,
      rules
    }
  },
  {
    label: '单选框组',
    type: 'radio',
    dynamic: false,
    options: {
      defaultValue: '',
      width: '',
      inline: true,
      remote: false,
      showLabel: false,
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      options: [
        {
          value: 'Option 1',
          label: 'Option 1'
        },
        {
          value: 'Option 2',
          label: 'Option 2'
        },
        {
          value: 'Option 3',
          label: 'Option 3'
        }
      ],
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      disabled: false,
      rules
    }
  },
  {
    label: '多选框组',
    type: 'checkbox',
    dynamic: false,
    options: {
      defaultValue: [],
      width: '',
      inline: true,
      remote: false,
      showLabel: false,
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      options: [
        {
          label: 'Option 1',
          value: 'Option 1'
        },
        {
          label: 'Option 2',
          value: 'Option 2'
        },
        {
          label: 'Option 3',
          value: 'Option 3'
        }
      ],
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      disabled: false,
      rules
    }
  },
  {
    label: '时间选择器',
    type: 'time',
    dynamic: false,
    options: {
      defaultValue: '',
      width: '',
      placeholder: '请选择时间',
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss',
      readonly: false,
      allowClear: true,
      disabled: false,
      rules
    }
  },
  {
    label: '日期选择器',
    type: 'date',
    dynamic: false,
    options: {
      defaultValue: '',
      width: '',
      placeholder: '请选择时间',
      format: 'YYYY-MM-DD',
      readonly: false,
      allowClear: true,
      disabled: false,
      rules
    }
  },
  {
    label: '评分',
    type: 'rate',
    dynamic: false,
    options: {
      defaultValue: null,
      max: 5,
      allowClear: true,
      allowHalf: false,
      disabled: false,
      rules
    }
  },
  {
    label: '下拉选择框',
    type: 'select',
    dynamic: false,
    options: {
      defaultValue: [],
      width: '200px',
      mode: null,
      placeholder: '',
      remote: false,
      showLabel: false,
      showSearch: false,
      clearable: false,
      disabled: false,
      props: {
        label: 'label',
        value: 'value'
      },
      options: [
        {
          label: 'Option 1',
          value: 'Option 1'
        },
        {
          label: 'Option 2',
          value: 'Option 2'
        },
        {
          label: 'Option 3',
          value: 'Option 3'
        }
      ],
      remoteOptions: [],
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules
    }
  },
  {
    label: '开关',
    type: 'switch',
    options: {
      dynamic: false,
      defaultValue: false,
      disabled: false,
      checkedChildren: '',
      unCheckedChildren: '',
      rules
    }
  },
  {
    label: '滑块',
    type: 'slider',
    dynamic: false,
    options: {
      defaultValue: 0,
      width: '',
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      range: false,
      reverse: false,
      rules
    }
  },
  {
    label: '文字',
    type: 'text',
    options: {
      defaultValue: 'This is a text'
    }
  }
]

export const advanceComponents = [
  {
    label: '图片',
    type: 'img-upload',
    options: {
      defaultValue: [],
      name: 'file',
      action: 'http://example.com/upload',
      method: 'post',
      listType: 'text',
      accept: 'image/*',
      maxCount: 3,
      multiple: false,
      disabled: false,
      rules
    }
  },
  {
    label: '富文本编辑器',
    type: 'richtext-editor',
    options: {
      defaultValue: '',
      width: '',
      disabled: false
    }
  },
  {
    label: '级联选择器',
    type: 'cascader',
    options: {
      defaultValue: [],
      width: '200px',
      placeholder: '',
      disabled: false,
      allowClear: false,
      remote: true,
      remoteOptions: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules
    }
  }
]

export const layoutComponents = [
  {
    label: '栅格布局',
    type: 'grid',
    dynamic: false,
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  }
]
