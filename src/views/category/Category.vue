<template>
  <div class="wrapper" ref="aaa">
    <ul class="content">
      <li>列表01</li>
      <li>列表02</li>
      <li>列表03</li>
      <li>列表04</li>
      <li>列表05</li>
      <li>列表06</li>
      <li>列表07</li>
      <li>列表08</li>
      <li>列表09</li>
      <li>列表010</li>
      <li>列表011</li>
      <li>列表012</li>
      <li>列表013</li>
      <li>列表014</li>
      <li>列表015</li>
      <li>列表016</li>
      <li>列表017</li>
      <li>列表018</li>
      <li>列表019</li>
      <li>列表020</li>
      <li>列表021</li>
      <li>列表022</li>
      <li>列表023</li>
      <li>列表024</li>
      <li>列表025</li>
      <li>列表026</li>
      <li>列表027</li>
      <li>列表028</li>
      <li>列表029</li>
      <li>列表030</li>
      <li>列表031</li>
      <li>列表032</li>
      <li>列表033</li>
      <li>列表034</li>
      <li>列表035</li>
      <li>列表036</li>
      <li>列表037</li>
      <li>列表038</li>
      <li>列表039</li>
      <li>列表040</li>
      <li>列表041</li>
      <li>列表042</li>
      <li>列表043</li>
      <li>列表044</li>
      <li>列表045</li>
      <li>列表046</li>
      <li>列表047</li>
      <li>列表048</li>
      <li>列表049</li>
      <li>列表050</li>
      <li>列表051</li>
      <li>列表052</li>
      <li>列表053</li>
      <li>列表054</li>
      <li>列表055</li>
      <li>列表056</li>
      <li>列表057</li>
      <li>列表058</li>
      <li>列表059</li>
      <li>列表060</li>
      <li>列表061</li>
      <li>列表062</li>
      <li>列表063</li>
      <li>列表064</li>
      <li>列表065</li>
      <li>列表066</li>
      <li>列表067</li>
      <li>列表068</li>
      <li>列表069</li>
      <li>列表070</li>
      <li>列表071</li>
      <li>列表072</li>
      <li>列表073</li>
      <li>列表074</li>
      <li>列表075</li>
      <li>列表076</li>
      <li>列表077</li>
      <li>列表078</li>
      <li>列表079</li>
      <li>列表080</li>
      <li>列表081</li>
      <li>列表082</li>
      <li>列表083</li>
      <li>列表084</li>
      <li>列表085</li>
      <li>列表086</li>
      <li>列表087</li>
      <li>列表088</li>
      <li>列表089</li>
      <li>列表090</li>
      <li>列表091</li>
      <li>列表092</li>
      <li>列表093</li>
      <li>列表094</li>
      <li>列表095</li>
      <li>列表096</li>
      <li>列表097</li>
      <li>列表098</li>
      <li>列表099</li>
      <li>列表0100</li>
    </ul>
  </div>
</template>

<script>
  import  BScroll from 'better-scroll'

  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'), {
        probeType: 3,
        pullUpLoad: true
          });

      this.scroll.on('scroll',(position) => {
          console.log(position)
      });
      //
      // this.scroll.on('pullUpLoad',() => {
      //   console.log('pick me!')
      // })
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color:  red;
    overflow: hidden;
  }
</style>
