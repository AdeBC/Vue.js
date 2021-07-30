<template>
 <div class="AMP_card">
    <el-row>
      <el-col :span="22" :offset="1">
        <el-container>
<!--          <sidebar-menu :menu="menu" />-->
          <el-aside>
            Aside
          </el-aside>
          <el-main>
<!--            <el-table-column prop="Accession" label="Accession" width="200%"></el-table-column>-->
            <span><h1>Antimicrobial peptide: {{ AMP.Accession }}</h1></span>

            <div style="text-align: end">
              <el-button class="button" type="primary">Export</el-button>
            </div>
            <h3>General information</h3>
            <el-card class="box-card">
                <div style="text-align: left">
                  <ul>
                    <li><span class="info-item">Family</span>: {{ AMP.Info.Family }}</li>
                    <li><span class="info-item">Length</span>: {{ AMP.Info.Length }}</li>
                    <li><span class="info-item">Molecular weight</span>: {{ AMP.Info.MW }}</li>
                    <li><span class="info-item">Sequence</span>: {{ AMP.Info.Sequence }}</li>
                    <li><span class="info-item">Source (meta)genome (with hyperlink)</span>: {{ AMP.Info.Metagenomes }}</li>
                  </ul>
                </div>
            </el-card>
            <br/>

            <h3>Distribution</h3>
            <el-card class="box-card">
              <div style="height: 350px;">
                <div class="info" style="height: 15%">
                  <span>Center: {{ center }}</span>
                  <span>Zoom: {{ zoom }}</span>
                  <span>Bounds: {{ bounds }}</span>
                </div>
                <l-map
                    style="height: 80%; width: 100%"
                    :zoom="zoom"
                    :center="center"
                    @update:zoom="zoomUpdated"
                    @update:center="centerUpdated"
                    @update:bounds="boundsUpdated"
                >
                  <l-tile-layer :url="url"></l-tile-layer>
                </l-map>
              </div>
            </el-card>

            <h3>Secondary structure</h3>
            <el-card class="box-card">
              <div style="text-align: left">
                <ul>
                  <li><span class="info-item">Alpha helix</span>: {{ AMP.Struct.helix }}</li>
                  <li><span class="info-item">Beta turn</span>: {{ AMP.Struct.turn }}</li>
                  <li><span class="info-item">Beta sheet</span>: {{ AMP.Struct.sheet }}</li>
                </ul>
              </div>
            </el-card>

            <h3>Biochemical properties</h3>
            <el-card class="box-card">
              <div style="text-align: left">
                <ul>
                  <li><span class="info-item">Charge at pH 7.0</span>: {{ AMP.Info.Charget_at_pH_7 }}</li>
                  <li><span class="info-item">Isoeletric point</span>: {{ AMP.Info.Isoeletric_point }}</li>
                  <li><span class="info-item">Molar extinction</span>: {{ AMP.Info.Molar_extinction }}</li>
                  <li><span class="info-item">Aromaticity</span>: {{ AMP.Info.Aromaticity }}</li>
                  <li><span class="info-item">GRAVY</span>: {{ AMP.Info.GRAVY }}</li>
                  <li><span class="info-item">Instability index</span>: {{ AMP.Info.Instability_index }}</li>
                </ul>
              </div>
            </el-card>

            <el-carousel :interval="4000" type="card" height="400px" :autoplay=false :loop=false>
              <el-carousel-item v-for="item in AMP.graphs" :key="item">
                <div style="text-align: center">
                  <el-link :href="item.graph"
                           target="_blank"
                           type="primary">
                    <h3 class="medium">{{ item.name }}</h3>
                  </el-link><br/>
                  Figure captions.
                </div>
                <el-image :src="item.graph"></el-image>
              </el-carousel-item>
            </el-carousel>
          </el-main>
        </el-container>
      </el-col>
    </el-row>

  </div>
</template>

<style>
  .info-item {
    font-weight: bold;
    color: #063d7c;
    font-size: large;
  }
    .el-tabs__item {
        font-size: 17px;
    }
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }

    .el-main {
      color: #333;
      text-align: center;
    }
</style>

<script>
import {LMap, LTileLayer} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
  export default {
    name: 'AMP_card',
    components: {
      LMap,
      LTileLayer,
    },
    data() {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        zoom: 3,
        center: [47.413220, -1.219482],
        bounds: null,
        menu: [
          {
            header: 'Main Navigation',
            hiddenOnCollapse: true
          },
          {
            href: '/',
            title: 'Dashboard',
            icon: 'fa fa-user'
          },
          {
            href: '/charts',
            title: 'Charts',
            icon: 'fa fa-chart-area',
            child: [
              {
                href: '/charts/sublink',
                title: 'Sub Link'
              }
            ]
          }
        ],
        ampId: '',
        AMP: {
            Accession: 'AMP10.000_000',
            Info: {
            Sequence: 'KKVKSIFKKALAMMGENEVKAWGIGIK',
            MW: '3.01 kDa',
            Length: 27,
            Family: 'SPHERE-III.000-000',
            Metagenomes: ['sample1', 'sample2', 'sample3'],
              Molar_extinction: [5500, 5500],
            Aromaticity: 0.07407407407407407,
            GRAVY: -0.11111111111111117,
            Instability_index: -18.348148148148148,
            Isoeletric_point: 10.12554931640625,
            Charget_at_pH_7: 0.758729531142717,
            },
            Struct: {
            helix: 29.629629629629626,
            turn: 18.51851851851852,
            sheet: 29.629629629629626
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
            }],
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
      zoomUpdated (zoom) {
        this.zoom = zoom;
      },
      centerUpdated (center) {
        this.center = center;
      },
      boundsUpdated (bounds) {
        this.bounds = bounds;
      },
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
    }}
    }
  }
</script>
