<template>
  <div class="AMP_card">
    <el-row>
      <el-col :span="4" :offset="18">
        <el-button type="primary"
                   icon="el-icon-download">
          Export
        </el-button>
      </el-col>
      <el-col :span="22" :offset="1">
<!--        <el-descriptions class="margin-top" title="Basic information" border=true column="1">-->
<!--          <el-descriptions-item label="Accession">{{desc.Accession}}</el-descriptions-item>-->
<!--          <el-descriptions-item label="Sequence">{{desc.Sequence}}</el-descriptions-item>-->
<!--          <el-descriptions-item label="MW">{{desc.MW}}</el-descriptions-item>-->
<!--          <el-descriptions-item label="Length">{{desc.Length}}</el-descriptions-item>>-->
<!--          <el-descriptions-item label="Molar extinction">{{desc.Molar_extinction}}</el-descriptions-item>-->
<!--          <el-descriptions-item label="Aromaticity">{{desc.Aromaticity}}</el-descriptions-item>-->
<!--          <el-descriptions-item label="GRAVY">{{desc.GRAVY}}</el-descriptions-item>-->
<!--          <el-descriptions-item label="Instability index">{{desc.Instability_index}}</el-descriptions-item>-->
<!--          <el-descriptions-item label="Isoeletric point">{{desc.Isoeletric_point}}</el-descriptions-item>-->
<!--          <el-descriptions-item label="Charget at pH 7.0">{{desc.Charget_at_pH_7}}</el-descriptions-item>-->
<!--          <el-descriptions-item label="Secondary structure">{{desc.sec_struct}}</el-descriptions-item>-->
<!--        </el-descriptions>-->
        <el-carousel :interval="4000" type="card" height="400px" autoplay=false loop=false>
          <el-carousel-item v-for="item in graphs" :key="item">
            <div style="text-align: center">
              <el-link :href="item.graph"
                       target="_blank"
                       type="primary">
                <h3 class="medium">{{ item.name }}</h3>
              </el-link>
            </div>
            <el-image :src="item.graph"></el-image>
          </el-carousel-item>
        </el-carousel>

      </el-col>
    </el-row>
  </div>
</template>

<style>
    .el-tabs__item {
        font-size: 17px;
    }
</style>

<script>
  export default {
    name: 'AMP_card',

    data() {
      return {
        ampId: '',
        desc: {
          Accession: 'AMP10.000_000',
          Sequence: 'KKVKSIFKKALAMMGENEVKAWGIGIK',
          MW: '3.01 kDa',
          Length: 27,
          Molar_extinction: [5500, 5500],
          Aromaticity: 0.07407407407407407,
          GRAVY: -0.11111111111111117,
          Instability_index: -18.348148148148148,
          Isoeletric_point: 10.12554931640625,
          Charget_at_pH_7: 0.758729531142717,
          sec_struct:{
            helix: 29.629629629629626,
            turn: 18.51851851851852,
            sheet: 29.629629629629626
          }
      },
        graphs: [
          {
            name: 'aa composition diviation',
            graph: require('./../assets/images/aa_composition_deviation_AMP10.000_000.png'),
          },{
            name: 'aindex_z',
            graph: require('./../assets/images/AMP10.000_000_aindex_z.png')
          },{
            name: 'boman z',
            graph: require('./../assets/images/AMP10.000_000_boman_z.png')
          },{
            name: 'charge z',
            graph: require('./../assets/images/AMP10.000_000_charge_z.png')
          },{
            name: 'hmoment z',
            graph: require('./../assets/images/AMP10.000_000_hmoment_z.png')
          }
      ],
      }
    },

    computed: {
        shadow: function () {
            if (this.isNull) {
                return 'never';
            } else {
                return 'always';
            }
        }
    },

    mounted() {
        if (Object.keys(this.$route.query).length !== 0) {
            if (this.$route.query.AMP_ID) {
                this.ampId = this.$route.query.AMP_ID;
            }
            this.isNull = true;
            this.tabLoading = true;
            this.search();
        }
    },

    methods: {
        clickSearch() {
            if (this.ampId !== "") {
                this.type = "danger";
                this.searchLoading = true;
                this.isNull = true;
                this.tabLoading = true;
                this.search();
            } else {
                this.AMP_Family = [];
                this.AMP_Feature = [];
                this.AMP_Metagenome = {};
                this.AMP_Prediction = [];
                this.AMP_Country = [];
                this.AMP_Environment = [];
                this.isNull = true;
                //this.drawCountryChart();
                //this.drawEnvironmentChart();
            }
        },

        search() {
            let self = this;
            this.axios.get('/amp/', {
                params: {
                    ampId: this.ampId,
                }
            }).then(function (response) {
                if (response.status === 200) {
                    self.AMP_Family = response.data['AMP_Family'];
                    self.AMP_Feature = response.data['AMP_Feature'];
                    self.AMP_Metagenome = response.data['AMP_Metagenome'];
                    self.AMP_Prediction = response.data['AMP_Prediction'];
                    self.AMP_Country = response.data['AMP_Country'];
                    self.AMP_Environment = response.data['AMP_Environment'];
                    self.AMP_Graphs = response.data['AMP_Graphs'];
                    self.isNull = false;
                    //self.drawCountryChart();
                    //self.drawEnvironmentChart();

                } else if (response.status === 204) {
                    self.AMP_Family = [];
                    self.AMP_Feature = [];
                    self.AMP_Metagenome = {};
                    self.AMP_Prediction = [];
                    self.AMP_Country = [];
                    self.AMP_Environment = [];
                    self.isNull = true;
                    //self.drawCountryChart();
                    //self.drawEnvironmentChart();
                }
                self.type = 'primary';
                self.searchLoading = false;
                self.tabLoading = false;
            }).catch(function (error) {
                console.log(error);
            });
        },

        drawCountryChart() {
            let self = this;
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('country'));

            if (self.AMP_Country.length > 0) {
                delete self.AMP_Country[0]['id'];
                delete self.AMP_Country[0]['AMP_ID'];

                // 指定图表的配置项和数据
                var option = {
                    toolbox: {
                        feature: {
                            magicType: {
                                type: ['line', 'bar'],
                                title: {
                                    line: 'for line charts',
                                    bar: 'for line charts',
                                }
                            },
                            saveAsImage: {
                                title: 'save as image',
                                pixelRatio: 2
                            }
                        }
                    },
                    xAxis: {
                        type: 'value',
                        axisLabel: {
                            fontSize: 14
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    grid: [{
                        top: '10%',
                        bottom: '5%',
                        left: '5%',
                        right: '10%',
                        containLabel: true
                    }],
                    yAxis: {
                        type: 'category',
                        data: Object.keys(self.AMP_Country[0]),
                        axisLabel: {
                            rotate: 30,
                            fontSize: 14
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    series: [{
                        type: 'bar',
                        data: Object.keys(self.AMP_Country[0]).map(function (key) {
                            return self.AMP_Country[0][key];
                        }),
                        color: '#000000',
                        label: {
                            show: true,
                            position: 'right',
                            fontSize: 14
                        },
                    }],
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            } else {
                myChart.clear();
            }
        },

        drawEnvironmentChart() {
            let self = this;
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('environment'));

            if (self.AMP_Environment.length > 0) {
                delete self.AMP_Environment[0]['id'];
                delete self.AMP_Environment[0]['AMP_ID'];

                // 指定图表的配置项和数据
                var option = {
                    toolbox: {
                        feature: {
                            magicType: {
                                type: ['line', 'bar'],
                                title: {
                                    line: 'for line charts',
                                    bar: 'for line charts',
                                }
                            },
                            saveAsImage: {
                                title: 'save as image',
                                pixelRatio: 2
                            }
                        }
                    },
                    xAxis: {
                        type: 'value',
                        axisLabel: {
                            fontSize: 14
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    grid: [{
                        top: '10%',
                        bottom: '5%',
                        left: '5%',
                        right: '10%',
                        containLabel: true
                    }],
                    yAxis: {
                        type: 'category',
                        data: Object.keys(self.AMP_Environment[0]),
                        axisLabel: {
                            rotate: 30,
                            fontSize: 14
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    series: [{
                        type: 'bar',
                        data: Object.keys(self.AMP_Environment[0]).map(function (key) {
                            return self.AMP_Environment[0][key];
                        }),
                        color: '#000000',
                        label: {
                            show: true,
                            position: 'right',
                            fontSize: 14
                        },
                    }],
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            } else {
                myChart.clear();
            }
        }
    }
  }
</script>
