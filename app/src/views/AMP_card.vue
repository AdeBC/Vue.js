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
                    <li><span class="info-item">Source metagenomes </span>: {{ AMP.Info.Metagenomes }}</li>
                    <li><span class="info-item">Source genomes </span>: {{ AMP.Info.Genomes }}</li>
                  </ul>
                </div>
            </el-card>
            <br/>

            <h3>Distribution</h3>
            <el-card class="box-card">
              <el-row>
                <Plotly :data="methods.GeoPlotData()" :layout="methods.GeoPlotLayout()"></Plotly>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div><Plotly :data="methods.EnvPlotData()"/></div>
                </el-col>
                <el-col :span="12">
                  <div><Plotly :data="methods.HostPlotData()"/></div>
                </el-col>
              </el-row>
<!--              <BarPlot/>-->
            </el-card>
<!--            <el-card class="box-card">-->
<!--              <div style="height: 350px;">-->
<!--                <div class="info" style="height: 15%">-->
<!--                  <span>Center: {{ center }}</span>-->
<!--                  <span>Zoom: {{ zoom }}</span>-->
<!--                  <span>Bounds: {{ bounds }}</span>-->
<!--                </div>-->
<!--                <l-map-->
<!--                    style="height: 80%; width: 100%"-->
<!--                    :zoom="zoom"-->
<!--                    :center="center"-->
<!--                    @update:zoom="zoomUpdated"-->
<!--                    @update:center="centerUpdated"-->
<!--                    @update:bounds="boundsUpdated"-->
<!--                >-->
<!--                  <l-tile-layer :url="url"></l-tile-layer>-->
<!--                </l-map>-->
<!--              </div>-->
<!--            </el-card>-->

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

            <h3>Features</h3>
            <el-carousel :interval="4000" type="card" height="400px" :autoplay=false :loop=false>
              <el-carousel-item v-for="item in AMP.features" :key="item">
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

            <h3>Comparison with the entire database</h3>
            <el-carousel :interval="4000" type="card" height="400px" :autoplay=false :loop=false>
              <el-carousel-item v-for="item in AMP.comparison" :key="item">
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
// import BubbleMap from "./../components/BubbleMap"
// import BarPlot from "../components/BarPlot";
import Plotly from "../components/Plotly"
// import {LMap, LTileLayer} from "@vue-leaflet/vue-leaflet";
// import "leaflet/dist/leaflet.css";


  export default {
    name: 'AMP_card',
    components: {
      // BarPlot,
      // BubbleMap,
      Plotly
      // LMap,
      // LTileLayer,
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
            Metagenomes: ['sample1', 'sample2', 'sample3'],
            Genomes: [],
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
          features: [{
            name: 'EZenergy',
            graph: require('./../assets/images/EZenergy_AMP10.000_000.png')
          },{
            name: 'flexibility',
            graph: require('./../assets/images/flexibility_AMP10.000_000.png')
          },{
            name: 'helicalwheel',
            graph: require('./../assets/images/helicalwheel_AMP10.000_000.png')
          },{
            name: 'hydrophobicity Parker',
            graph: require('./../assets/images/hydrophobicity_Parker_AMP10.000_000.png')
          },{
            name: 'SA AMP',
            graph: require('./../assets/images/SA_AMP10.000_000.png')
          }],
          comparison:[{
            name: 'aa composition diviation',
            graph: require('./../assets/images/aa_composition_deviation_AMP10.000_000.png')
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
          },{
            name: 'hydrophobicity z',
            graph: require('./../assets/images/AMP10.000_000_hydrophobicity_z.png')
          },{
            name: 'instaindex z',
            graph: require('./../assets/images/AMP10.000_000_instaindex_z.png')
          },{
            name: 'pI z',
            graph: require('./../assets/images/AMP10.000_000_pI_z.png')
          }],
        },

        computed: {
        },

        mounted() {
        },

        methods: {
          GeoPlotData(){
            let geoData = {FRA: 20, DEU: 10, RUS: 15, ESP: 25, CHN: 30} // fix here
            return [{
              type: 'scattergeo',
              mode: 'markers',
              locations: Object.keys(geoData),
              marker: {
                size: Object.values(geoData),
                color: [100,100,100,100,100],
                cmin: 0,
                cmax: 100,
                colorscale: 'Reds',
                // colorbar: {
                //   title: 'Distribution',
                //   ticksuffix: '%',
                //   showticksuffix: 'last'
                // },
                line: {
                  color: 'black'
                }
              },
            }]
          },
          GeoPlotLayout(){
            return {
              // 'title': {
              //   'text': 'Geographical distribution',
              //   'side': 'bottom',
              // },
              'geo': {
                'scope': 'global',
                'resolution': 50,
                'showland': true,
                'landcolor': 'rgb(217, 217, 217)',
                'subunitwidth': 1,
                'countrywidth': 1,
                'subunitcolor': 'rgb(255,255,255)',
                'countrycolor': 'rgb(255,255,255)'
              },
              'margin': {
                'l': 30,
                'r': 30,
                't': 30,
                'b': 30
              }
            }
          },
          EnvPlotData(){
            let envData = {built_environment: 20, wastewater: 10,
              animal_gut: 25, soil: 0, freshwater: 0} // fix here
            return [{
              x: Object.values(envData),
              y: Object.keys(envData),
              orientation: 'h',
              marker: {
                color: 'rgba(55,128,191,0.6)',  // change the colors
                // color: ['red', 'green', 'black'],
                width: 0.3
              },
              type: 'bar'
            }]
          },
          HostPlotData(){
            let hostData = {human: 35, mouse: 25, pig: 30, dog: 3, cat: 5} // fix here
            return [{
              x: Object.values(hostData),
              y: Object.keys(hostData),
              orientation: 'h',
              marker: {
                color: 'rgba(55,128,191,0.6)', // change the colors
                // color: ['red', 'green', 'black'],
                width: 0.3
              },
              type: 'bar'
            }]
          }
        }
      }
    }
  }
</script>
