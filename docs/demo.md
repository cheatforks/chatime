# Demo

## 获取当前时间

<vuep template="#getNow"></vuep>

<script v-pre type="text/x-template" id="getNow">
  <template>
      <div>现在的时间是： 
        <span class="time">
            {{ now }}
        </span>
      </div>
  </template>
  <script>
      module.exports = {
        data: function () {
          return { now: 'Vue' }
        },
        mounted: function () {
          this.now = chatime.get({
              type: 'yyyymmdd hhmmss'
          });
        }
      }
  </script>
</script>



## Chat模式
<vuep template="#chatMode"></vuep>
<script v-pre type="text/x-template" id="chatMode">
    <template>
        <div>
            <div>
                sevenHoursAgo: {{ sevenHoursAgo }}
            </div>
            <div>
                twoMinutesAgo: {{ twoMinutesAgo }}
            </div>
        </div>
    </template>
    <script>
        module.exports = {
            data: function () {
                return {
                    sevenHoursAgo: '',
                    twoMinutesAgo: ''
                }
            },
            mounted: function () {
                var sevenHoursAgo = new Date().getTime() - 1000 * 3600 * 7;
                var twoMinutesAgo = new Date().getTime() - 1000 * 120;
                this.sevenHoursAgo = chatime.get({
                    time: sevenHoursAgo,
                    type: 'chat'
                });
                this.twoMinutesAgo = chatime.get({
                    time: twoMinutesAgo,
                    type: 'chat'
                });
            }
        }
</script>
