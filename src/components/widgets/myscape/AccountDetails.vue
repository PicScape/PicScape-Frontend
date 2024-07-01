<template>
  <div>
    <p>User ID: {{ userid }}</p>
  </div>
  <div class="profile-card">
    <div class="top">
    </div>
    <div class="bottom">
      <div class="card-content">
        <img src="https://api.picscape.xyz/image/view/22970" alt="Profile Picture" class="profile-pic">
        <div class="details-container">
          <div class="username">{{ userObj ? userObj.user.username : 'Loading...' }}</div>
          <div class="userid">Joined on 12.02.2023 20:23</div>
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
    };
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
    } catch {
      console.log("error while mount")
    }


    try {
      const response = await axiosService.getUser("userId", this.userid);
      this.roles = response.user.roles || [];
      console.log(response);
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
  width: 45%;
  background-color: var(--card-color);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: auto;
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
  bottom: 40px;
  left: 5%;
}

.profile-pic {
  width: 100px;
  height: 100px;
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
  font-size: 15px;
}


.userid {
  font-size: 13px;
  font-weight: bold;

  color: var(--white-surface-300);
}

.username {
  font-size: 22px;
  font-weight: bold;
  color: var(--white-surface-100);
}

.roles-container {
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
}

</style>
