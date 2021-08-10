<template>
 <div class="AMP_card">
    <el-row>
      <el-col :span="22" :offset="1">
        <el-container>
<!--          <sidebar-menu :menu="menu" />-->
          <el-aside>
<!--            <ul style="position: fixed; top:300px; line-height: 30px; text-align: left">-->
<!--              <li><a class="nav-section" href="#general_info">General information</a></li>-->
<!--              <li><a class="nav-section" href="#distribution">Distribution</a></li>-->
<!--              <ul>-->
<!--                <li><a class="nav-subsection" href="#global-distribution">Global</a></li>-->
<!--                <li><a class="nav-subsection" href="#distribution-across-habitats">Habitats</a></li>-->
<!--                <li><a class="nav-subsection" href="#distribution-across-hosts">Hosts</a></li>-->
<!--              </ul>-->
<!--              <li><a class="nav-section" href="#properties">Biochemical properties</a></li>-->
<!--            </ul>-->
            <el-menu style="position: fixed; top:300px; line-height: 30px; text-align: left; width:250px">
              <el-submenu>
                <template #title>
                  <i class="el-icon-info"></i>
                <a class="nav-section" href="#general_info">General information</a>
              </template>
              </el-submenu>
              <el-submenu>
                <template #title>
                  <i class="el-icon-info"></i>
                  <a class="nav-section" href="#distribution">Distribution</a>
                </template>
                <el-menu-item><a class="nav-subsection" href="#global-distribution">Global</a></el-menu-item>
                <el-menu-item><a class="nav-subsection" href="#distribution-across-habitats">Habitats</a></el-menu-item>
                <el-menu-item><a class="nav-subsection" href="#distribution-across-hosts">Hosts</a></el-menu-item>
              </el-submenu>
              <el-submenu>
                <template #title>
                  <i class="el-icon-info"></i>
                  <a class="nav-section" href="#properties">Properties</a>
                </template>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main>
<!--            <el-table-column prop="Accession" label="Accession" width="200%"></el-table-column>-->
            <span>
              <h1>Antimicrobial peptide: {{ AMP.Accession }}
                <el-button class="button" @click="methods.downloadCurrPage()" type="primary" icon="el-icon-download" circle></el-button>
              </h1>
            </span>

            <h3 id="general_info">General information</h3>
            <el-card class="box-card">
                <div style="text-align: left">
                  <el-col :span="16">
                    <ul>
                      <li><span class="info-item">Family</span>: {{ AMP.Info.Family }}</li>
                      <li><span class="info-item">Length</span>: {{ AMP.Info.Length }}</li>
                      <li><span class="info-item">Molecular weight</span>: {{ AMP.Info.MW }}</li>
                      <li><span class="info-item">Sequence</span>: {{ AMP.Info.Sequence }}</li>
                      <li><span class="info-item">Associated smORFs</span>:
                        <el-tooltip class="item" effect="dark" content="Download smORFs list" placement="right">
                          <el-button @click="methods.downloadSourceMGs()" type="text"
                                    icon="el-icon-download" circle></el-button>
                        </el-tooltip>
                        <br>
                        <el-link v-for="ORF in AMP.Info.smORFs.slice(0, 3)" :key="ORF"
                                 :href="ORF" type="info">
                          {{ ORF }}&nbsp;&nbsp;
                        </el-link><More style="width: 1em; height: 1em; margin-right: 8px;" />
                      </li>
                      <li><span class="info-item">Source metagenomes</span>:
                        <el-tooltip class="item" effect="dark" content="Download metagenome list" placement="right">
                          <el-button @click="methods.downloadSourceMGs()" type="text"
                                     icon="el-icon-download" circle></el-button>
                        </el-tooltip>
                        <br>
                        <el-link v-for="m in AMP.Info.Metagenomes.slice(0, 3)" :key="m"
                                 :href="m" type="info">
                          {{ m }}&nbsp;&nbsp;
                        </el-link><More style="width: 1em; height: 1em; margin-right: 8px;" />
                      </li>
                      <div v-if="AMP.Info.Genomes.length > 0">
                        <li><span class="info-item">Source genomes</span>:
                          <el-tooltip class="item" effect="dark" content="Download genome list" placement="right">
                            <el-button @click="methods.downloadSourceGenomes()" type="text"
                                       icon="el-icon-download" circle>
                            </el-button>
                          </el-tooltip>
                          <br>
                          <el-link v-for="g in AMP.Info.Genomes.slice(0, 3)" :key="g"
                                   :href="g" type="info">{{ g }}&nbsp;&nbsp;
                          </el-link><More style="width: 1em; height: 1em; margin-right: 8px;" />
                        </li>
                      </div>
                    </ul>
                  </el-col>
                  <el-col :span="8">
                    <div style="height: 300px;">
<!--                    <Plotly :data="methods.SecStructureData()" :layout="methods.SecStructureLayout()"/>-->
                      <Plotly :data="methods.SecStructurePieData()"
                              :layout="{title: {text: 'Secondary Structure'},
                              margin: {l: 10, r: 10, t: 70, b: 30, pad: 0},
                              showlegend: false, height: 300}"/>
                    </div>
                  </el-col>
                </div>
            </el-card>

            <h3 id="distribution">Distribution</h3>
            <el-card class="box-card">
              <el-row>
                <h4 id="global-distribution">Global distribution</h4>
                <Plotly :data="methods.GeoPlotData()" :layout="methods.GeoPlotLayout()"></Plotly>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <h4 id="distribution-across-habitats">Across habitats</h4>
                  <div><Plotly :data="methods.EnvPlotData()" :layout="methods.EnvPlotLayout()"/></div>
                </el-col>
                <el-col :span="12">
                  <h4 id="distribution-across-hosts">Across hosts</h4>
                  <div><Plotly :data="methods.HostPlotData()" :layout="methods.HostPlotLayout()"/></div>
                </el-col>
              </el-row>
            </el-card>


            <h3 id="properties">Biochemical properties</h3>
            <el-card class="box-card">
              <el-col :span="12">
              <div style="text-align: left">
<!--                More spaces-->
                <ul>
                  <li><span class="info-item">Charge at pH 7.0</span>: {{ AMP.Info.Charget_at_pH_7 }}</li>
                  <li><span class="info-item">Isoeletric point</span>: {{ AMP.Info.Isoeletric_point }}</li>
                  <li><span class="info-item">Molar extinction</span>: {{ AMP.Info.Molar_extinction }}</li>
                  <li><span class="info-item">Aromaticity</span>: {{ AMP.Info.Aromaticity }}</li>
                  <li><span class="info-item">GRAVY</span>: {{ AMP.Info.GRAVY }}</li>
                  <li><span class="info-item">Instability index</span>: {{ AMP.Info.Instability_index }}</li>
                </ul>
              </div>
              </el-col>
              <el-col :span="5" :offset="3">
                <div style="text-align: center">
                  <el-link :href="AMP.helicalwheel"
                           target="_blank"
                           type="primary">
                    <span class="medium">Helical wheel</span>
                  </el-link>
                  <br/>
                </div>
                <div style="align-content: center; text-align: center; width: 200px">
                  <el-tooltip class="item" effect="dark" content="Figure caption" placement="right">
                    <el-image :src="AMP.helicalwheel"></el-image>
                  </el-tooltip>
                </div>
              </el-col>

              <el-col :span="12">
                <h4>Features</h4>
                <el-carousel height="400px" direction="horizontal" :autoplay="false" :loop="false">
                  <el-carousel-item v-for="item in AMP.features" :key="item">
                    <div style="text-align: center">
                      <el-link :href="item.graph"
                               target="_blank"
                               type="primary">
                        <span class="medium">{{ item.name }}</span>
                      </el-link>
                      <br/>
                    </div>
                    <el-tooltip class="item" effect="dark" :content="item.caption" placement="top">
                    <el-image :src="item.graph"></el-image>
                    </el-tooltip>
                  </el-carousel-item>
                </el-carousel>
<!--                tips to switch between graphs-->
              </el-col>
              <el-col :span="12">
                <h4>Comparison with the entire database</h4>
                <el-carousel height="400px" :autoplay="false" :loop="false">
                  <el-carousel-item v-for="item in AMP.comparison" :key="item">
                    <div style="text-align: center">
                      <el-link :href="item.graph"
                               target="_blank"
                               type="primary">
                        <span class="medium">{{ item.name }}</span>
                      </el-link><br/>
                    </div>
                    <el-tooltip class="item" effect="dark" :content="item.caption" placement="top">
                    <el-image :src="item.graph"></el-image>
                    </el-tooltip>
                  </el-carousel-item>
                </el-carousel>
              </el-col>
            </el-card>
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
  .nav-section {
    font-size: medium;
    font-weight: bold
  }
  .nav-subsection{
    font-size: small;
    font-weight: normal;
  }
    .el-tabs__item {
        font-size: 17px;
    }
    .el-aside {
      /*background-color: #D3DCE6;*/
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
// import BubbleMap from "./../components/BubbleMap"
// import BarPlot from "../components/BarPlot";
import Plotly from "../components/Plotly"
//import { tsvParse } from 'd3-dsv'
import * as d3 from "d3-dsv";


export default {
    name: 'AMP_card',
    components: {
      Plotly
    },
    data() {
      return {
        ampId: '',
        AMP: {
          Accession: 'AMP10.000_000',
          Info: {
            Sequence: 'KKVKSIFKKALAMMGENEVKAWGIGIK',
            MW: '3.01 kDa',
            Length: 27,
            Family: 'SPHERE-III.000-000',
            smORFs: ['GMSC10.SMORF.000_036_987_159', 'GMSC10.SMORF.000_036_944_92',
              'GMSC10.SMORF.000_036_899_109'],
            Metagenomes: ['SAMEA104142073', 'SAMEA104142073', 'SAMEA104142073',
              'SAMEA104142073', 'SAMEA104142073'],
            Genomes: ['344610.PRJNA15639', '344610.PRJNA15639', '344610.PRJNA15639'],
            // Genomes: ['a', 'b'],
            Molar_extinction: [5500, 5500],
            Aromaticity: 0.07407407407407407,
            GRAVY: -0.11111111111111117,
            Instability_index: -18.348148148148148,
            Isoeletric_point: 10.12554931640625,
            Charget_at_pH_7: 0.758729531142717,
          },
          helicalwheel: require('./../assets/images/helicalwheel_AMP10.000_000.png'),
          features: [{
            name: 'EZenergy',
            caption: 'xxxxx',
            graph: require('./../assets/images/EZenergy_AMP10.000_000.png')
          },{
            name: 'flexibility',
            caption: 'xxxxx',
            graph: require('./../assets/images/flexibility_AMP10.000_000.png')
          },{
            name: 'hydrophobicity Parker',
            caption: 'xxxxx',
            graph: require('./../assets/images/hydrophobicity_Parker_AMP10.000_000.png')
          },{
            name: 'SA AMP',
            caption: 'xxxxx',
            graph: require('./../assets/images/SA_AMP10.000_000.png')
          }],
          comparison:[{
            name: 'aa composition diviation',
            caption: 'xxxxx',
            graph: require('./../assets/images/aa_composition_deviation_AMP10.000_000.png')
          },{
            name: 'aindex_z',
            caption: 'xxxxx',
            graph: require('./../assets/images/AMP10.000_000_aindex_z.png')
          },{
            name: 'boman z',
            caption: 'xxxxx',
            graph: require('./../assets/images/AMP10.000_000_boman_z.png')
          },{
            name: 'charge z',
            graph: require('./../assets/images/AMP10.000_000_charge_z.png')
          },{
            name: 'hmoment z',
            caption: 'xxxxx',
            graph: require('./../assets/images/AMP10.000_000_hmoment_z.png')
          },{
            name: 'hydrophobicity z',
            caption: 'xxxxx',
            graph: require('./../assets/images/AMP10.000_000_hydrophobicity_z.png')
          },{
            name: 'instaindex z',
            caption: 'xxxxx',
            graph: require('./../assets/images/AMP10.000_000_instaindex_z.png')
          },{
            name: 'pI z',
            caption: 'xxxxx',
            graph: require('./../assets/images/AMP10.000_000_pI_z.png')
          }],
        },

        computed: {
        },

        mounted() {
        },

        methods: {
          SecStructureData(){
            let strucData = {
              helix: 29.629629629629626,
              turn: 18.51851851851852,
              sheet: 29.629629629629626}
            return [{
              x: [strucData.helix],
              y: [''],
              name: 'Alpha helix',
              orientation: 'h',
              type: 'bar',
              marker: {width: 0.5},
            },{
              x: [strucData.turn],
              y: [''],
              name: 'Beta turn',
              orientation: 'h',
              type: 'bar',
              marker: {width: 0.5},
            },{
              x: [strucData.sheet],
              y: [''],
              name: 'Beta sheet',
              orientation: 'h',
              type: 'bar',
              marker: {width: 0.5},
            },{
              x: [100 - strucData.turn - strucData.helix - strucData.sheet],
              y: [''],
              name: 'Disordered',
              orientation: 'h',
              type: 'bar',
              marker: {width: 0.5},
            }]
          },
          SecStructureLayout(){
            return {
              margin: {l: 0, r: 0, t: 0, b: 0},
              barmode: 'stack',
              legend: {orientation: "h", xanchor: "center", x: 0.5, y: 0.95},
            }
          },
          SecStructurePieData(){
            let strucData = {
              helix: 29.629629629629626,
              turn: 18.51851851851852,
              sheet: 29.629629629629626}
            strucData.disordered = 100 - strucData.turn - strucData.helix - strucData.sheet
            return [{
              type: 'pie',
              values: Object.values(strucData),
              labels: Object.keys(strucData),
              marker:{
                colors: this.ColorPalette('quanlitative'),
              },
              textinfo: "label+percent",
              insidetextorientation: "radial"}]
          },
          GeoPlotData(){
            let GeoString = "n\tenvironmental_features\tlatitude\tlongitude\tMO-level-I\n" +
              "10\thuman-associated habitat [ENVO:00009003]\t39.9\t116.25\tTerrestrial\n" +
              "70\thuman-associated habitat [ENVO:00009003]\t37.27567620000001\t-104.65581230000001\tTerrestrial\n" +
              "10\tanimal-associated habitat [ENVO:00006776]\t52.13\t5.29\tTerrestrial\n" +
              "10\thuman-associated habitat [ENVO:00009003]\t34.5\t109.5\tTerrestrial\n" +
              "10\thuman-associated habitat [ENVO:00009003]\t39.9\t116.25\tTerrestrial\n" +
              "10\thuman-associated habitat [ENVO:00009003]\t47.3\t106.15\tTerrestrial\n" +
              "30\thuman-associated habitat [ENVO:00009003]\t56.21285989999999\t9.3005073\tTerrestrial\n" +
              "10\thuman-associated habitat [ENVO:00009003]\t38.626999999999995\t-90.1994\tTerrestrial\n" +
              "10\thuman-associated habitat [ENVO:00009003]\t30.3\t120.2\tTerrestrial\n" +
              "30\thuman-associated habitat [ENVO:00009003]\t56.21285989999999\t9.3005073\tTerrestrial"
            let geoData = d3.tsvParse(GeoString, d3.autoType)
            console.log(geoData)
            return [{
              type: 'scattergeo',
              //locationmode: 'USA-states',
              lat: this.UnpackCol(geoData, 'latitude'),
              lon: this.UnpackCol(geoData, 'longitude'),
              marker: {
                size: this.UnpackCol(geoData, 'n'),
                color: this.MapColors(this.UnpackCol(geoData, 'MO-level-I'), this.ColorPalette('quanlitative')),
                line: {
                  color: 'black',
                  size: 2
                }
              },
            }]
          },
          GeoPlotLayout(){
            return {
              showlegend: false,
              geo: {
                scope: 'global',

                resolution: 50,
                showland: true,
                landcolor: 'rgb(217, 217, 217)',
                subunitwidth: 1,
                countrywidth: 1,
                subunitcolor: 'rgb(255,255,255)',
                countrycolor: 'rgb(255,255,255)'
              },
              margin: {
                l: 30,
                r: 30,
                t: 30,
                b: 30
              }
            }
          },
          EnvPlotData(){
            return [{
              type: "sunburst",
              labels: ['Terrestrial', "Aquatic", "Anthropogenic", "Host-associated", "Soil",
                "Freshwater", "Wastewater", "Animal host", "Plant host", "Marine",
                "Spring", "Groundwater", "Algal host", "Built-environment"],
              parents: ["", "", "", "", "Terrestrial",
                "Aquatic", "Aquatic", "Host-associated", "Host-associated", "Aquatic",
                "Aquatic", "Aquatic", "Host-associated", "Anthropogenic"],
              values:  [0, 0, 0, 0, 12,
                10, 2, 6, 6, 4,
                4, 5, 10, 14],
              outsidetextfont: {size: 20, color: "#377eb8"},
              leaf: {opacity: 0.4},
              marker: {
                line: {
                  width: 2
                }
              },
            }]
          },
          EnvPlotLayout(){
            return {
              margin: {l: 40, r: 40, b: 40, t: 40},
              sunburstcolorway: this.ColorPalette('quanlitative')
            };
          },
          HostPlotData(){
            return [{
              type: "sunburst",
              labels: ['Terrestrial', "Aquatic", "Anthropogenic", "Host-associated", "Soil",
                "Freshwater", "Wastewater", "Animal host", "Plant host", "Marine",
                "Spring", "Groundwater", "Algal host", "Built-environment"],
              parents: ["", "", "", "", "Terrestrial",
                "Aquatic", "Aquatic", "Host-associated", "Host-associated", "Aquatic",
                "Aquatic", "Aquatic", "Host-associated", "Anthropogenic"],
              values:  [0, 0, 0, 0, 12,
                10, 2, 6, 6, 4,
                4, 5, 10, 14],
              outsidetextfont: {size: 20, color: "#377eb8"},
              leaf: {opacity: 0.4},
              marker: {
                line: {
                  width: 2
                }
              },
            }]
          },
          HostPlotLayout(){
            return {
              margin: {l: 40, r: 40, b: 40, t: 40},
              sunburstcolorway: this.ColorPalette('quanlitative')
           };
          },
          MapColors(categories, colors){
            const levels = [...new Set(categories)]
            console.log(levels)
            const mapping = []
            for (let i=0; i<=categories.length; i++){
              mapping[levels[i]] = colors[i]
            }
            return categories.map(function (cate) {
              return mapping[cate]
            })
          },
          ColorPalette(kind){
            if (kind === 'sequential'){
              return ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#8c2d04']
            }
            else if (kind === 'diverging'){
              return ['#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#c7eae5', '#80cdc1', '#35978f', '#01665e']
            }
            else if (kind === 'quanlitative'){
              return ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666']
            }
            else{
              console.log('please set the `kind` option for color palette.')
              return null
            }
          },
          UnpackCol(rows, key) {
            return rows.map(function(row) { return row[key]; });
          },
          downloadCurrPage(){
            print()
          }
        }
      }
    }
  }
</script>
