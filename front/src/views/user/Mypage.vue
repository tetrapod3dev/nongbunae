<template>
  <v-container
    class="fill-height px-0 align-start"
    style="background-color: #2bc77e13"
  >
    <v-list width="100%" class="nbn--list-font pb-0">
      <div class="nbn--list-font-bold text-overline text--disabled px-4">
        내메뉴
      </div>
      <div class="px-4"><v-divider></v-divider></div>

      <v-list-item-group>
        <v-dialog
          v-model="dialog.device"
          scrollable
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template #activator="{ attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title class="nbn--list-font font-weight-bold"
                  >기기등록 및 변경</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>

          <v-card class="rounded-0">
            <!-- dialog title start -->
            <v-toolbar flat dark dense color="primary">
              <v-btn icon @click="dialog.device = !dialog.device">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-toolbar-title class="text-body-1 nbn--list-font-bold">
                기기등록 및 변경
              </v-toolbar-title>
            </v-toolbar>
            <!-- dialog title end -->
            <v-card-text>
              <DeviceUpdate />
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-list-item
          href="https://frogue.danbee.ai/?chatbot_id=8ac8ca73-ec86-4dd1-ba66-388919215cf5"
        >
          <v-list-item-content>
            <v-list-item-title class="nbn--list-font font-weight-bold">
              FAQ 챗봇
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item :to="{ name: 'Tutorial' }">
          <v-list-item-content>
            <v-list-item-title class="nbn--list-font font-weight-bold">
              튜토리얼
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-content>
            <v-list-item-title class="nbn--list-font font-weight-bold">
              로그아웃
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-list width="100%" class="mt-3 pb-0">
      <div class="nbn--list-font-bold text-overline text--disabled px-4">
        작물관리
      </div>
      <div class="px-4"><v-divider></v-divider></div>

      <v-list-item-group>
        <v-list-item :to="{ name: 'PlantCalendar2' }">
          <v-list-item-content>
            <v-list-item-title class="nbn--list-font font-weight-bold">
              재배일기
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item v-if="plantCharInfo" :to="{ name: 'PlantReport' }">
          <v-list-item-content>
            <v-list-item-title class="nbn--list-font font-weight-bold">
              재배작물 정보
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-dialog
          v-if="!plantCharInfo"
          v-model="dialog.seedChoice"
          scrollable
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template #activator="{ attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title class="nbn--list-font font-weight-bold">
                  재배작물 심기
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
          <v-card class="rounded-0">
            <!-- dialog title start -->
            <v-toolbar flat dark dense color="primary">
              <v-btn icon @click="dialog.seedChoice = !dialog.seedChoice">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-toolbar-title class="text-body-1 nbn--list-font-bold">
                재배작물 심기
              </v-toolbar-title>
            </v-toolbar>
            <!-- dialog title end -->
            <v-card-text class="pa-0">
              <SeedList v-if="dialog.seedChoice" :choice="true" />
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog
          v-if="plantCharInfo"
          v-model="dialog.cancel"
          scrollable
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template #activator="{ attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title class="nbn--list-font font-weight-bold">
                  재배작물 취소
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>

          <v-card class="rounded-0">
            <!-- dialog title start -->
            <v-toolbar flat dark dense color="primary">
              <v-btn icon @click="dialog.cancel = !dialog.cancel">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-toolbar-title class="text-body-1 nbn--list-font-bold">
                재배작물 취소
              </v-toolbar-title>
            </v-toolbar>
            <!-- dialog title end -->
            <v-card-text>
              <v-img
                class="mx-auto my-5"
                width="70%"
                :src="require('@/assets/작물취소.png')"
              />
              <div
                class="py-2 my-4"
                style="
                  background-color: #2bc77e98;
                  border-radius: 20px;
                  color: white;
                "
              >
                <div class="nbn--list-font text-h6 text-center my-3">
                  정말 작물을 취소하나요?
                </div>
                <div class="nbn--list-font text-h6 text-center my-3">
                  되돌릴 수 없답니다
                </div>
              </div>
              <v-btn
                color="primary"
                outlined
                rounded
                block
                elevation="5"
                @click.prevent="stopGrowPlant"
              >
                작물 취소
              </v-btn>
              <p style="height: 650px"></p>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialog.seedList"
          scrollable
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template #activator="{ attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title class="nbn--list-font font-weight-bold">
                  새싹정보
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
          <v-card class="rounded-0">
            <!-- dialog title start -->
            <v-toolbar flat dark dense color="primary">
              <v-btn icon @click="dialog.seedList = !dialog.seedList">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-toolbar-title class="text-body-1 nbn--list-font-bold">
                새싹정보
              </v-toolbar-title>
            </v-toolbar>
            <!-- dialog title end -->
            <v-card-text class="pa-0">
              <SeedList v-if="dialog.seedList" />
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-list-item-group>
    </v-list>

    <v-list width="100%" class="mt-3 pb-0">
      <div class="nbn--list-font-bold text-overline text--disabled px-4">
        장비관리
      </div>
      <div class="px-4"><v-divider></v-divider></div>

      <v-list-item-group>
        <!-- 수동급수 다이얼로그 -->
        <v-dialog
          v-model="dialog.water"
          scrollable
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template #activator="{ attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title class="nbn--list-font font-weight-bold"
                  >수동급수</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>

          <v-card class="rounded-0">
            <!-- dialog title start -->
            <v-toolbar flat dark dense color="primary">
              <v-btn icon @click="dialog.water = !dialog.water">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-toolbar-title class="text-body-1 nbn--list-font-bold">
                수동급수
              </v-toolbar-title>
            </v-toolbar>
            <!-- dialog title end -->
            <v-card-text>
              <Watering />
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- led 켜기 다이얼로그 -->
        <v-dialog
          v-model="dialog.ledon"
          scrollable
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template #activator="{ attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title class="nbn--list-font font-weight-bold"
                  >LED ON</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>

          <v-card class="rounded-0">
            <!-- dialog title start -->
            <v-toolbar flat dark dense color="primary">
              <v-btn icon @click="dialog.ledon = !dialog.ledon">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-toolbar-title class="text-body-1 nbn--list-font-bold">
                LED ON
              </v-toolbar-title>
            </v-toolbar>
            <!-- dialog title end -->
            <v-card-text>
              <LedOn />
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- led 끄기 다이얼로그 -->
        <v-dialog
          v-model="dialog.ledoff"
          scrollable
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template #activator="{ attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title class="nbn--list-font font-weight-bold"
                  >LED OFF</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>

          <v-card class="rounded-0">
            <!-- dialog title start -->
            <v-toolbar flat dark dense color="primary">
              <v-btn icon @click="dialog.ledoff = !dialog.ledoff">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-toolbar-title class="text-body-1 nbn--list-font-bold">
                LED OFF
              </v-toolbar-title>
            </v-toolbar>
            <!-- dialog title end -->
            <v-card-text>
              <LedOff />
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- 사진 찍기 다이얼로그 -->
        <v-dialog
          v-model="dialog.camera"
          scrollable
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template #activator="{ attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title class="nbn--list-font font-weight-bold"
                  >사진찍기</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>

          <v-card class="rounded-0">
            <!-- dialog title start -->
            <v-toolbar flat dark dense color="primary">
              <v-btn icon @click="dialog.camera = !dialog.camera">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-toolbar-title class="text-body-1 nbn--list-font-bold">
                사진 찍기
              </v-toolbar-title>
            </v-toolbar>
            <!-- dialog title end -->
            <v-card-text>
              <Camera />
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-list-item-group>
    </v-list>

    <v-list width="100%" class="mt-3 pb-0">
      <div class="nbn--list-font-bold text-overline text--disabled px-4">
        팀소개
      </div>
      <div class="px-4"><v-divider></v-divider></div>

      <v-list-item v-for="(item, index) in teamListItems" :key="index">
        <v-list-item-content>
          <v-list-item-subtitle
            class="text-caption text--secondary"
            v-text="item.title"
          />
          <v-list-item-title
            class="nbn--list-font font-weight-bold"
            v-text="item.content"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list width="100%" class="mt-3 py-0">
      <v-list-item-group>
        <v-dialog
          v-model="dialog.privacy"
          scrollable
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template #activator="{ attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title class="nbn--list-font font-weight-bold"
                  >이용약관</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
          <v-card class="rounded-0">
            <!-- dialog title start -->
            <v-toolbar flat dark dense color="primary">
              <v-btn icon @click="dialog.privacy = !dialog.privacy">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-toolbar-title class="text-body-1 nbn--list-font-bold">
                이용 약관
              </v-toolbar-title>
            </v-toolbar>
            <!-- dialog title end -->
            <v-card-text>
              <PrivacyPolicy v-if="dialog.privacy" />
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-list-item-group>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle class="text-caption text--secondary">
            앱 정보
          </v-list-item-subtitle>
          <v-list-item-title class="nbn--list-font font-weight-bold">
            3.1.3
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import http from "@/utils/http-common";
import { mapGetters, mapActions, mapMutations } from "vuex";

import PrivacyPolicy from "@/views/user/PrivacyPolicy.vue";
import SeedList from "@/views/seed/SeedList.vue";
import DeviceUpdate from "@/views/device/DeviceUpdate.vue";
import Watering from "@/views/user/IoTcontrol/Watering.vue";
import LedOn from "@/views/user/IoTcontrol/LedOn.vue";
import LedOff from "@/views/user/IoTcontrol/LedOff.vue";
import Camera from "@/views/user/IoTcontrol/Camera.vue";

export default {
  name: "Mypage",
  data() {
    return {
      dialog: {
        privacy: false,
        seedList: false,
        seedChoice: false,
        device: false,
        cancel: false,
        water: false,
        ledon: false,
        ledoff: false,
        camera: false,
      },
      teamListItems: [
        {
          title: "팀명",
          content: "슬기로운 재배생활",
        },
        {
          title: "팀원",
          content: "진슬기(팀장), 박지은, 박태록, 서정하, 오지수",
        },
        {
          title: "홈페이지",
          content: "www.nongbunae.com",
        },
        {
          title: "팀코드",
          content: "S03P31A105",
        },
      ],
    };
  },
  components: {
    PrivacyPolicy,
    SeedList,
    DeviceUpdate,
    Watering,
    LedOn,
    LedOff,
    Camera,
  },
  computed: {
    ...mapGetters(["plantCharInfo", "user", "config"]),
  },
  methods: {
    ...mapActions(["setAuth", "setUser", "setPlantCharInfo"]),
    ...mapMutations(["SET_PLANTCHARINFO", "LOGOUT"]),
    logout() {
      this.LOGOUT();
      this.$router.push({ name: "Login" });
    },
    startGrowPlant() {
      if (this.user.user_id == "54c2018801dafce76b6aedafd47d3305") {
        let params = new URLSearchParams();
        params.append("plant_id", "");
        http
          .post("/api/choice", params, this.config)
          .then(() => {
            this.updateUserState();
            http
              .get(
                "/iot/iot-actions?action=start&choice_id=" + this.user.choice_id
              )
              .then(() => {
                alert("재배를 시작합니다.");
              })
              .catch(() => {});
          })
          .catch(() => {});
      } else {
        alert("기기를 구입해 주세요.");
      }
    },
    stopGrowPlant() {
      if (this.user.user_id == "54c2018801dafce76b6aedafd47d3305") {
        let params = new URLSearchParams();
        params.append("choice_id", this.user.choice_id);
        http
          .put("/api/choice", params, this.config)
          .then(() => {
            this.setPlantCharInfo(null);
            this.SET_PLANTCHARINFO(null);
            this.updateUserState();
            http
              .get(
                "/iot/iot-actions?action=stop&choice_id=" + this.user.choice_id
              )
              .then(() => {
                alert("재배를 중단합니다.");
              })
              .catch(() => {});
          })
          .catch(() => {});
      } else {
        alert("기기를 구입해 주세요.");
      }
    },
    updateUserState() {
      // choice_id 변경된 부분 vuex user에 적용
      http
        .get("/api/user", this.config)
        .then((res) => {
          this.setUser(res.data);
          // 등록된 기기가 없으면
          if (res.data.user_pot == null) {
            this.$router.push({ name: "PlantEmpty" });
          }
          // 등록된 기기가 있으면
          else {
            this.$router.push({ name: "PlantMain" });
          }
        })
        .catch((err) => {
          console.log("회원정보 catch" + err.data);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.nbn--list-font {
  font-family: "Handon3gyeopsal300g";
  font-size: 15px;

  &-bold {
    font-family: "Handon3gyeopsal600g";
  }
}
</style>
