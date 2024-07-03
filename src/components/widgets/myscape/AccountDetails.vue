<template>

  <div class="profile-card">
    <div class="top">
    </div>
    <div class="bottom">
      <div class="card-content">
        <img :src="getProfilePictureUrl()" alt="Profile Picture" class="profile-pic">
        <div class="details-container">
          <div class="username">{{ userObj ? userObj.user.username : 'Loading...' }}</div>
          <div class="joined">Joined 12.02.2023 20:23</div>
          <div class="roles-container">
        <div v-for="(role, index) in roles" :key="index" class="role">
          {{ role }}
        </div>
      </div>
        </div>
      </div>
      

    </div>
    
  </div>
</template>

<script>
import axiosService from '@/services/axiosService';

export default {
  data() {
    return {
      userid: null,
      userObj: null,
      roles: ["test"],
      pfp_url: '',
    };
  },
  methods: {
    getProfilePictureUrl() {
      return this.pfp_url
    }
  },
  async mounted() {
    try {
      
      this.userid = this.$route.params.userid;
      
      if (!this.userid) {
        const user = await axiosService.checkTokenValidity()
        if (user) {
          this.userid = user.user.id;
          this.roles = user.user.roles || [];
        } else {
          window.location.href = '/login';
        }

      }
      const baseURL = process.env.VUE_APP_API_URL;
      this.pfp_url = `${baseURL}/fetch/pfp/${this.userid}`;
    } catch {
      console.log("error while mount")
    }


    try {
      const response = await axiosService.getUser("userId", this.userid);
      this.roles = response.user.roles || [];
      this.userObj = response;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
};
</script>

<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 870px;
  background-color: var(--card-color);
  border-radius: 8px 8px 8px 0px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 20px;

}

@media (max-width: 890px) {
  .profile-card {
    width: calc(100% - 20px);
  }
}

.top {
  background-color: var(--color-surface-900);
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding-top: 70px;
}

.bottom {
  display: flex;
  align-items: center;
  width: 100%;
}

.card-content {
  display: flex;
  align-items: center;
  position: relative;
  bottom: 35px;
  left: 5%;
}

.profile-pic {
  width: 130px;
  height: 130px;
  border-radius: 20px;
  margin-right: 20px;
}

.details-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: auto;
  padding-bottom: 3px;
}

.role {
  background-color: #d3d3d3;
  border-radius: 4px;
  padding: 2px 4px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;
  margin-bottom: 0;
  color: black;
  font-weight: 500;
  font-size: 13px;
}


.joined {
  margin-top: 5px;

  font-size: 13px;
  font-weight: 400;

  color: var(--white-surface-300);
}

.username {
  font-size: 24px;
  font-weight: 900;
  color: var(--white-surface-100);
}

.roles-container {
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
}

</style>
