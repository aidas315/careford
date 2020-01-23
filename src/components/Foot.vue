<template>
      <!-- Site footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">{{ $root.pageDescription() }}</p>
          </div>

          <div class="col-xs-6 col-md-3 contact">
            <h6>Contact</h6>
            <!-- <ul class="footer-links" v-for="(category) in categories_with_child" :key="category.id">
                <li><b-link :to="{name: 'category', params: {id: category.id}}">{{ category.title }}</b-link></li>
              <ul <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
              <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
              <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
              <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
              <li><a href="http://scanfcode.com/category/android/">Android</a></li>
              <li><a href="http://scanfcode.com/category/templates/">Templates</a></li> 
            </ul> -->
            <p>
                <font-awesome-icon :icon="['fas', 'archway']"></font-awesome-icon> 
                <span style="margin-top: -30px; margin-left: 25px;">
                  <a href="https://goo.gl/maps/NLM2No7Q22tW4kWu8" target="_blank" title="View On Google Maps">  Near UC Office, New Adalat Garh, UK Road, Sialkot, Punjab, Pakistan.</a>
                </span>
            </p>
            <p>
                <font-awesome-icon :icon="['fas', 'phone']"></font-awesome-icon> 
                <span> <a href="tel:+923322492000" title="Dail This Number">+92 332 24 92 000</a></span>
            </p>
            <p>
                <font-awesome-icon :icon="['fab', 'whatsapp']"></font-awesome-icon> 
                <span> <a href="https://wa.me/923456725715" target="_blank" title="Send Message on Whatsapp">+92 345 67 25 715</a></span>
            </p>
            <p>
                <font-awesome-icon :icon="['fas', 'envelope']"></font-awesome-icon> 
                <span> <a href="mailto:carefordcorporation@gmail.com" title="Send Mail">carefordcorporation@gmail.com</a></span>
            </p>
          </div>


          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="http://scanfcode.com/about/">About Us</a></li>
              <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
              <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
              <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
              <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <hr>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; {{ year }}. All Rights Reserved by {{ $root.title }}.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <p class="copyright-text" style="text-align: right">Developed by <a href="https://github.com/aidas315" target="_blank" title="Software Development Organization">AIDAS</a>, <a href="https://github.com/AbdulRehmanMehar" title="Founder of AIDAS">Abdul Rehman</a>.
            </p>
          </div>
        </div>
      </div>
</footer>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    },
    computed: {
        categories_with_child() {
            return this.$store.getters.categories_with_child
        },
    }
}
</script>

<style scoped>
.site-footer
{
  background-color:#26272b;
  padding:45px 0 20px;
  font-size:15px;
  line-height:24px;
  color:#737373;
  margin-top: 100px;
}
.site-footer hr
{
  border-top-color:#bbb;
  opacity:0.5
}
.site-footer hr.small
{
  margin:20px 0
}
.site-footer h6
{
  color:#fff;
  font-size:16px;
  text-transform:uppercase;
  margin-top:5px;
  letter-spacing:2px
}
.site-footer a
{
  color:#737373;
}
.site-footer a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links
{
  padding-left:0;
  list-style:none
}
.footer-links li
{
  display:block
}
.footer-links a
{
  color:#737373
}
.footer-links a:active,.footer-links a:focus,.footer-links a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links.inline li
{
  display:inline-block
}
.site-footer .social-icons
{
  text-align:right
}
.site-footer .social-icons a
{
  width:40px;
  height:40px;
  line-height:40px;
  margin-left:6px;
  margin-right:0;
  border-radius:100%;
  background-color:#33353d
}
.copyright-text
{
  margin:0
}
@media (max-width:991px)
{
  .site-footer [class^=col-]
  {
    margin-bottom:30px
  }
}
@media (max-width:767px)
{
  .site-footer
  {
    padding-bottom:0
  }
  .site-footer .copyright-text,.site-footer .social-icons
  {
    text-align:center
  }
}
.social-icons
{
  padding-left:0;
  margin-bottom:0;
  list-style:none
}
.social-icons li
{
  display:inline-block;
  margin-bottom:4px
}
.social-icons li.title
{
  margin-right:15px;
  text-transform:uppercase;
  color:#96a2b2;
  font-weight:700;
  font-size:13px
}
.social-icons a{
  background-color:#eceeef;
  color:#818a91;
  font-size:16px;
  display:inline-block;
  line-height:44px;
  width:44px;
  height:44px;
  text-align:center;
  margin-right:8px;
  border-radius:100%;
  -webkit-transition:all .2s linear;
  -o-transition:all .2s linear;
  transition:all .2s linear
}
.social-icons a:active,.social-icons a:focus,.social-icons a:hover
{
  color:#fff;
  background-color:#29aafe
}
.social-icons.size-sm a
{
  line-height:34px;
  height:34px;
  width:34px;
  font-size:14px
}
.social-icons a.facebook:hover
{
  background-color:#3b5998
}
.social-icons a.twitter:hover
{
  background-color:#00aced
}
.social-icons a.linkedin:hover
{
  background-color:#007bb6
}
.social-icons a.dribbble:hover
{
  background-color:#ea4c89
}
@media (max-width:767px)
{
  .social-icons li.title
  {
    display:block;
    margin-right:0;
    font-weight:600
  }
}
.contact p {
  margin-bottom: 5px;
}
.contact p font-awesome-icon, .contact p span {
    display: inline-block;
}
.contact p span {
    margin-left: 10px;
}
</style>