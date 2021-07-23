<template>
<div id="About">
  <el-row>
    <el-col :span="22" :offset="1">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/about' }">About</el-breadcrumb-item>
      </el-breadcrumb>
      <br/>
      <el-row>
        <el-table :data="dataStatsExamples">
          <el-table-column
              prop="type"
              label="Type"
              width="150">
          </el-table-column>
          <el-table-column
              label="Number of AMPs"
              width="150">
            <template #default="props">
              <el-button @click="handleBrowse(props.row.type)" type="text" size="small">
                {{ props.row.num_AMPs }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
              prop="example"
              label="Example"
              width="300">
          </el-table-column>
        </el-table>
      </el-row>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      dataStatsExamples: [{
        type: 'Families',
        num_AMPs: '3555 (example data)',
        example: 'SHERE-III.000-000',
      },{
        type: 'Hosts',
        num_AMPs: '30 (example data)',
        example: 'host a (human)'
      },{
        type: 'Environments',
        num_AMPs: '128 (example data)',
        example: 'root:host-associated:animal'
      }],
    }
  },
  methods: {
    handleFamilyDetail(accession){
      console.log('goto', '/family?accession='+accession)
      window.open('/family?accession='+accession, '_blank')
    },
    handleBrowse(by){
      window.open('/browse_data?by='+by, '_blank')
    }
  }
}
</script>

<style scoped>

</style>