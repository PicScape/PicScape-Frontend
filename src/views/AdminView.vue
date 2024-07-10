<template>
  <div class="container">
    <div class="sorting-section">
      <div class="left-buttons">
        <select v-model="sortField" class="sort-dropdown">
          <option value="created_at">Sort by Created At</option>
          <option value="username">Sort by Username</option>
        </select>
      </div>
      <div class="right-buttons">
        <button @click="toggleSortOrder">{{ sortOrderName }}</button>
      </div>
    </div>
    <AccountsList :sortField="sortField" :sortOrder="sortOrder" />
  </div>
</template>

<script>
import AccountsList from '@/components/admin/AccountsList.vue';

export default {
  components: {
    AccountsList,
  },
  data() {
    return {
      sortField: 'created_at',
      sortOrder: 'asc',
      sortOrderName: 'ascending',
    };
  },
  methods: {
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'dec' ? 'asc' : 'dec';
      if (this.sortOrder == "asc") {
        this.sortOrderName = "ascending"
      } else {
        this.sortOrderName = "descending"

      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
}

.sorting-section {
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
  width: 100%;

}

.left-buttons {
  margin-left: 10px;
  display: flex;

}

.right-buttons {
  display: flex;
  align-items: center;
}

.sort-dropdown button {
  background-color: #007bff;
  color: white;
  border: none !important;
  font-size: 14px;
  padding: 5px;

  border-radius: 5px;
  cursor: pointer;
}

.sort-dropdown {
  background-color: #007bff;
  color: white;
  border: none !important;

  font-size: 14px;

  border-radius: 5px;
  cursor: pointer;
}





.right-buttons button {

  background-color: #007bff;
  color: white;
  border: none;
  margin-left: 10px;
  font-size: 14px;
  padding: 5px;

  border-radius: 5px;
  cursor: pointer;
}

.right-buttons button:hover {
  background-color: #0056b3;
}

.right-buttons button:active {
  transform: translateY(0);
}

.right-buttons button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}
</style>
