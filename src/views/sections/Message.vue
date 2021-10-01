<template>
  <base-section id="message">
    <base-section-heading :title="$t('Message.title')" />

    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="message"
                append-outer-icon="mdi-send"
                filled
                clear-icon="mdi-close-circle"
                clearable
                type="text"
                :label="$t('Message.Message')"
                @keydown.enter="sendMessage"
                @click:append-outer="sendMessage"
                @click:clear="message =''"
              />
            </v-card-title>
            <v-card-text>
              <v-timeline dense>
                <v-slide-x-reverse-transition
                  group
                  hide-on-leave
                >
                  <v-timeline-item
                    v-for="(item, index) in messages"
                    :key="index"
                    small
                    fill-dot
                  >
                    <v-alert
                      class="white--text"
                      color="info"
                    >
                      {{ `${item.Name}:${item.Message}` }}
                    </v-alert>
                  </v-timeline-item>
                </v-slide-x-reverse-transition>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'Message',

    data: () => ({
      messageList: [],
      message: '',
    }),

    computed: {
      messages () {
        return this.messageList.slice().reverse()
      },
    },

    watch: {
      '$store.state.websocknet.socket.message': {
        handler (newVal, oldVal) {
          if (newVal.Command) {
            switch (newVal.Command) {
              case 'Message':
                this.messageList.push(newVal.Data)
                break
              default:
                break
            }
          }
        },
      },
    },

    methods: {
      sendMessage () {
        const Message = JSON.stringify({
          Command: 'Message',
          User: {
            Team: 'SecretTerritoryChallenge',
            UUID: 'WebUser',
          },
          Data: {
            Name: this.$store.state.userName,
            Message: this.message,
          },
        })
        if (this.message !== '') {
          this.$socket.send(Message)
        }
        this.message = ''
      },
    },
  }
</script>
