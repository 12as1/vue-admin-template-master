<template>
  <div>
   <Card></Card>
   <Sale></Sale>
   <Observer></Observer>
  </div>
</template>

<script>
import Card from './Card'
import Sale from './Sale'
import Observer from './Observer'
export default {
  name: 'Dashboard',
  components:{Card,Sale,Observer}
}
</script>

<style lang="scss" scoped>

</style>
