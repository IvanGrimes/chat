<template>
  <v-row>
    <v-col cols="12">
      <v-form ref="form">
        <v-text-field
            name="name"
            v-model="name"
            :rules="rules"
            placeholder="Введите ваше имя"
        />
        <v-btn @click="updateName">Ок</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<style scoped>
</style>

<script>
import Vue from 'vue'
import {Component, Ref, Watch} from "@/lib/decorators";
import {useStore} from "@/lib/store";
import {validation} from "@/lib/validation";

@Component
class UserNameInput extends Vue {
  @Ref("form")
  form

  user = useStore(this.$store).user

  config = useStore(this.$store).config

  name = ""

  @Watch('form.errorBag')
  checkValidation(value) {
    console.log(value)
  }

  get rules() {
    return [
      validation.required,
      validation.maxUsernameLength(this.config.maxUsernameLength)
    ]
  }

  updateName() {
    if (this.form?.validate?.()) {
      this.user.updateName(this.name)

      this.name = ""

      this.form?.resetValidation?.()
    }
  }
}

export default UserNameInput
</script>
