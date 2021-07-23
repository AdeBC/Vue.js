<template>
    <div class="Home">
      <el-row>
        <br/>
      </el-row>
      <el-row>
<!--        <h1 style="text-align: center">Global prokaryotic AMPs survey</h1>-->
        <el-col :offset="1" :span="10">
          <h2>Overview</h2>
          Antimicrobial peptides (AMPs) are small proteins with lengths ranging from 10 to 100
          residues of amino acids, which disturb microbial growth and can be produced by a wide
          range of organisms belonging to all life domains. These peptides are ancient defense
          molecules and some recently have shown activity against multi-resistant pathogens.
          Besides their clinical applications, AMPs also can be widely used in food preservation
          and agriculture. <br/><br/>
          Although small molecules, their diversity is huge and is hidden from most of the current
          bioinformatics techniques. In other words, peptides are not detected with enough
          confidence by the gene prediction methods and are often discharged to reduce the false
          discovery rate. Therefore, uncovering the diversity of AMPs is not just a matter of
          function prediction by homology, instead involves complex patterns and feature discovery
          with machine learning.<br/><br/>
          Recently, the <el-link type='primary' href="https://big-data-biology.org">Big Data
          Biology Research Group</el-link> from the Institute of Science and Technology
          for Brain-inspired Intelligence (ISTBI / Fudan University) developed a method called Macrel,
          which differs from other methods was directed to metagenomic approaches and can handle a
          variety of data formats (from reads to peptide sequences). By using Macrel, we started the
          Global AMPs Survey, a project which intends to collect all AMP sequences available in the
          public databases to date. Thus, motivated to develop a database-assisted platform that
          provides comprehensive functional and physicochemical features of large-scale (meta)genomic-
          derived AMPs, we created AMPsphere!<br/><br/>
          Just as the ecosphere is the worldwide sum of all ecosystems, the AMPsphere is the complexity
          of prokaryotic AMPs assembled in one dataset. To this date, it was analyzed ProGenomes2, which
          includes 86 thousand high-quality genomes, as well as a dataset of over 35,000 publicly
          available metagenomes. After redundancy removal, we produced a collection of AMPs from the
          global microbiome, containing 317,790 distinct sequences, clustered into 4,705 AMP families.<br/><br/>
        </el-col>
        <el-col :span="10" :offset="1">
          <h2>Benefits and Features</h2>

          <div style="font-weight: bold">1. Integration</div>
          AMPsphere displays each AMP as a flashcard and also as a list, clicking on it, you can access its
          family, location, and even samples where it was found. In the cases when AMPs were spotted in other
          databases, preferentially DRAMP, we also referred to their accession code, allowing users to cross
          information.<br/><br/>

          <div style="font-weight: bold">2. Functional and physicochemical properties</div>
          In the flashcard of each AMP there is information such as pI, charge, molecular weight, hydrophobicity,
          the proportion of charged residues, and the probabilities associated with the predictions of its
          antimicrobial and hemolytic activities. In some cases, the targets also were predicted using machine
          learning. Functionalities are available to filter the more than 300 thousand AMPs present in AMPsphere by
          physical-chemical properties or geographical/sample type origin.<br/><br/>

          <div style="font-weight: bold">3. AMPs from different species</div>
          An user-friendly interface for browsing the collected AMPs in AMPsphere provides users the possibility to
          map AMPs back to specI clusters, species name, NCBI taxID access codes, and also metagenome access codes.
          Besides that, AMPsphere presents a classification of all collected AMPs into families by identity, with
          phylogenetic trees, hidden Markov models (HMM), and alignments.<br/><br/>

          <div style="font-weight: bold">4. Tools</div>
          AMPsphere presents a section of tools with search tools preloaded with our database, where users
          can insert query sequences and search for homologs. Adjusting parameters, Blast can be used for
          direct ortholog search of AMP sequences and HMMSearch for AMP families. The database also is
          linked with the Macrel developing team and tool, allowing users to contribute actively with the
          search for new AMPs.<br/><br/>

          <div style="font-weight: bold">5. AMP web interface</div>
          Users can interact with the AMPsphere team and other users in a google community.
          To enable local analyses, the complete database is available for download on two
          different sites, the latest releases are both in Zenodo and on this
          web page. Users are allowed to browse all the AMPs' functionalities.<br/><br/>
        </el-col>
      </el-row>
<!--      <el-row>-->
<!--        <h3 style="text-align: center">Please cite</h3>-->
<!--        <el-col offset="1" :span="10">-->
<!--          <div>-->
<!--          For AMPSphere current version (<a href="https://doi.org/10.5281/zenodo.4606582">v.2021-08</a>), please cite:-->
<!--          </div>-->
<!--          <pre><code>-->
<!--          Santos-Júnior, Célio D.; Schmidt, Thomas S.B.;-->
<!--          Fullam, Anthony; Duan, Yiqian; Hui, Chong; Bork, Peer;-->
<!--          Zhao, Xing-Ming &amp; Coelho, Luis Pedro. (2021).-->
<!--          AMPSphere : the worldwide survey of prokaryotic-->
<!--          antimicrobial peptides (Version v.2021-08) [Data set].-->
<!--          Zenodo. DOI: 10.5281/zenodo.4606582-->
<!--        </code></pre>-->
<!--        </el-col>-->
<!--        <el-col offset="1" span="10">-->
<!--          <p>In case you also used <a href="http://big-data-biology.org/software/macrel/">Macrel</a> tool, please cite:</p>-->
<!--          <pre><code>-->
<!--          Santos-Júnior CD, Pan S, Zhao X, Coelho LP. 2020.-->
<!--          Macrel: antimicrobial peptide screening in genomes-->
<!--          and metagenomes. PeerJ 8:e10555.-->
<!--          DOI: 10.7717/peerj.10555-->
<!--          </code></pre>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row justify="center" align="middle">-->
<!--        <el-col :span="10" type="flex" justify="middle">-->
<!--          <div style="font-size: 150%; text-align: center">Browse by</div>-->
<!--        </el-col>-->
<!--        <el-col :span="10" :offset="2" type="flex" justify="middle">-->
<!--          <div style="font-size: 150%; text-align: center">Search by sequence</div>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        <br /><br />-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        <el-col :span="10" :offset="1">-->
<!--          <el-row>-->
<!--            <el-table :data="dataStatsExamples">-->
<!--              <el-table-column-->
<!--                  prop="type"-->
<!--                  label="Type"-->
<!--                  width="150">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                  label="Number of AMPs"-->
<!--                  width="150">-->
<!--                <template #default="props">-->
<!--                  <el-button @click="handleBrowse(props.row.type)" type="text" size="small">-->
<!--                    {{ props.row.num_AMPs }}-->
<!--                  </el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                  prop="example"-->
<!--                  label="Example"-->
<!--                  width="300">-->
<!--              </el-table-column>-->
<!--            </el-table>-->
<!--          </el-row>-->
<!--        </el-col>-->
<!--        <el-col :span="10" :offset="2" type="flex" justify="middle">-->
<!--          <el-row>-->
<!--            <div style="line-height: 100px;">-->
<!--              <el-input-->
<!--                  type="textarea"-->
<!--                  :autosize="{ minRows: 8, maxRows: 20}"-->
<!--                  placeholder="e.g. FFGIGQQEMTLEEIGDKFGLTRERVRQIKEKAIRRLRQS"-->
<!--                  v-model="text">-->
<!--              </el-input>-->
<!--            </div>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-select v-model="value" clearable placeholder="Select">-->
<!--              <el-option-->
<!--                  v-for="item in seqSearchMethods"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--            <el-button type="primary"-->
<!--                       icon="el-icon-search">-->
<!--              Search-->
<!--            </el-button>-->
<!--          </el-row>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </div>
</template>

<style>
.env-logos{
  width: 100%;
  height: 100px;
  background-color: #ffffff;
}
</style>

<script>
    export default {
        name: 'Home',

        data() {
            return {
              url: require('../assets/logo.png'),
              seqSearchMethods: [{
                value: 'MMseqs',
                label: 'MMseqs'
              }, {
                value: 'hmmsearch',
                label: 'hmmsearch'
              }],
            }
        },

        mounted() {
            this.axios.get('/').then(function (response) {
                if (response.status === 200) {
                    console.log('xxx')
                }
            }).catch(function (error) {
                console.log(error);
            });
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
