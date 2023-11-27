<template>
  <v-dialog v-model="display" persistent :width="dialogWidth">
    <template v-slot:activator="{ props }">
      <custom-text-field
        :id="id"
        v-bind="{ ...textFieldProps, ...props, ...$attrs }"
        :disabled="disabled"
        :loading="loading"
        hide-details="auto"
        :label="label"
        :required="required"
        :rules="required ? [(v) => !!v || label] : []"
        :placeholder="placeholder"
        :model-value="selectedDateValue"
        :value="selectedDateValue || formattedDatetime"
        prepend-inner-icon="mdi-calendar-range"
        readonly
      >
        <template v-slot:progress>
          <slot name="progress">
            <v-progress-linear
              color="primary"
              indeterminate
              absolute
              height="2"
            />
          </slot>
        </template>
      </custom-text-field>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text class="px-0 py-0">
          <v-date-picker
            v-model="date"
            v-bind="datePickerProps"
            show-adjacent-months
            hide-actions
            keyboard-icon="false"
            :elevation="0"
          >
            <template v-slot:title>
              <div
                style="visibility: collapse; height: 0; padding: 0"
              ></div>
            </template>
            <!-- <template v-slot:header>
            <div>
            </div>
          </template> -->
          </v-date-picker>
        </v-card-text>
        <v-card-actions class="pb-6 pr-7">
          <v-spacer />
          <v-btn
            variant="outlined"
            style="border-radius: 12px"
            :color="colorScheme.darkGray"
            @click.native="
              () => {
                isActive.value = false;
                clearHandler;
              }
            "
          >
            {{ clearText }}
          </v-btn>
          <v-btn
            variant="elevated"
            style="border-radius: 12px"
            :color="colorScheme.primary"
            @click="okHandler"
          >
            {{ okText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
  import CustomTextField from './CustomTextField.vue';

  const DEFAULT_DATE = new Date(Date.now());
  const DEFAULT_TIME = '00:00:00';
  const DEFAULT_DIALOG_WIDTH = 370;
  const DEFAULT_CLEAR_TEXT = 'Close';
  const DEFAULT_OK_TEXT = 'Ok';
  export default {
    name: 'CustomDateTimePicker',
    model: {
      prop: 'datetime',
      event: 'input',
    },
    components: {
      CustomTextField,
    },
    props: {
      id: {
        type: String,
        required: true,
      },
      datetime: {
        type: [Date, String],
        default: null,
      },
      disabled: {
        type: Boolean,
      },
      loading: {
        type: Boolean,
      },
      label: {
        type: String,
        default: '',
      },
      required: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: '',
      },
      dialogWidth: {
        type: Number,
        default: DEFAULT_DIALOG_WIDTH,
      },
      clearText: {
        type: String,
        default: DEFAULT_CLEAR_TEXT,
      },
      okText: {
        type: String,
        default: DEFAULT_OK_TEXT,
      },
      textFieldProps: {
        type: Object,
        default: () => {},
      },
      datePickerProps: {
        type: Object,
        default: () => {},
      },
      timePickerProps: {
        type: Object,
        default: () => {},
      },
      clearDateTime: {
        type: Boolean,
        default: false,
      },
      rules: {
        type: Array,
        default: () => [],
      },
      selectedDateValue: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        display: false,
        activeTab: 0,
        date: DEFAULT_DATE,
        time: DEFAULT_TIME,
        errorMessages: [],
      };
    },
    computed: {
      cancelBtnId() {
        return `${this.id}_cancelBtn`;
      },
      okBtnId() {
        return `${this.id}_okBtn`;
      },
      textFieldId() {
        return `${this.id}_textFieldId`;
      },
      formattedDatetime() {
        if (!this.selectedDatetime) {
          return null;
        }
        // const [hourStr, minStr] = this.time.split(':');
        // let hour = parseInt(hourStr, 10);
        // const amOrPm = hour < 12 ? 'a.m' : 'p.m';
        // if (hour > 12) {
        //   hour %= 12;
        // } else if (hour === 0) {
        //   hour = 12;
        // }
        return this.selectedDatetime;
      },
      selectedDatetime() {
        return `${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}`;
      },
      dateSelected() {
        return !this.date;
      },
    },
    watch: {
      datetime(newVal) {
        this.init(newVal);
        this.runRules(newVal);
      },
      clearDateTime(newValue) {
        if (newValue) {
          this.clearHandler();
          this.$emit('updateClearDateTimeFlag');
        }
      },
    },
    mounted() {
      this.init();
    },
    methods: {
      init(newVal) {
        if (!this.datetime) {
          if (newVal === null) {
            this.date = DEFAULT_DATE;
            this.time = DEFAULT_TIME;
          }
          return;
        }
        let initDateTime;
        if (this.datetime instanceof Date) {
          initDateTime = this.datetime;
        } else if (
          typeof this.datetime === 'string' ||
          this.datetime instanceof String
        ) {
          initDateTime = new Date(Date.parse(this.datetime));
        }
        const [dateStr, timeStr] = initDateTime
          .toISOString()
          .split('T');
        this.date = dateStr;
        this.time = timeStr.replace('.000Z', '');
      },
      okHandler() {
        this.resetPicker();
        this.$emit('input', this.selectedDatetime);
        this.$emit('change', this.selectedDatetime);
      },
      clearHandler() {
        this.resetPicker();
        this.date = DEFAULT_DATE;
        this.time = DEFAULT_TIME;
        this.$emit('input', null);
        this.$emit('change', null);
      },
      resetPicker() {
        this.display = false;
        this.activeTab = 0;
        if (this.$refs.timerPicker) {
          this.$refs.timerPicker.selectingHour = true;
        }
      },
      runRules(newVal) {
        this.errorMessages = [];
        this.rules.forEach((rule) => {
          const result = rule(newVal);
          if (typeof result === 'string') {
            this.errorMessages.push(result);
          }
        });
      },
    },
  };
</script>

<style lang="scss">
  .v-date-picker {
    .v-picker__header {
      .v-date-picker-header {
        .v-date-picker-header__append {
          visibility: hidden;
        }
      }
    }
  }
</style>
