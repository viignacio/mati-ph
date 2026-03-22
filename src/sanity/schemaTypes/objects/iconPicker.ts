import { defineType } from 'sanity'
import { IconPickerInput } from '../../components/IconPickerInput'

export const iconPicker = defineType({
  name: 'iconPicker',
  title: 'Icon',
  type: 'string',
  components: {
    input: IconPickerInput,
  },
})
