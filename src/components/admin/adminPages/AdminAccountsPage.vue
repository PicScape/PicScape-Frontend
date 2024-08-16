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
      <form class="search-section" @submit.prevent="handleSearch">
        <input v-model="LocalsearchValue" type="text" placeholder="Search..." class="search-input" />
        <button type="submit">Search</button>
      </form>
    </div>

    <AccountGallerie :sortField="sortField" :sortOrder="sortOrder" :searchValue="searchValue" />
  </div>
</template>

<script>
import AccountGallerie from '@/components/admin/galleries/AccountsGallerie.vue';

export default {
  components: {
    AccountGallerie,
  },
  data() {
    return {
      sortField: 'created_at',
      sortOrder: 'asc',
      sortOrderName: 'Ascending',
      searchValue: '',
      LocalsearchValue: '',
    };
  },
  watch: {
    LocalsearchValue(newValue) {
      if (!newValue.trim()) {
        this.handleSearch();
      }
    },
  },
  methods: {

    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'dec' ? 'asc' : 'dec';
      if (this.sortOrder == "asc") {
        this.sortOrderName = "Ascending"
      } else {
        this.sortOrderName = "Descending"

      }
    },
    handleSearch() {
      this.searchValue = this.LocalsearchValue
    }
  },
};
</script>

<style scoped>
.search-section {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 30px;
  margin-left: 20px;
}

.search-input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;

  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.sorting-section {
  display: flex;
  height: 30px;
  gap: 10px;
  margin-left: 10px;
  margin-right: 10px;

}


.sorting-section button {
  background-color: #007bff;
  color: white;
  border: none !important;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 30px;

}

.sorting-section button:hover {
  background-color: #0056b3;
}

.left-buttons {
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

  border-radius: 5px;
  cursor: pointer;
}

.sort-dropdown {
  background-color: #007bff;
  color: white;
  border: none !important;
  padding-left: 6px;
  padding-right: 6px;
  height: 30px;

  font-size: 14px;

  border-radius: 5px;
  cursor: pointer;
}





.right-buttons button {

  background-color: #007bff;
  color: white;
  border: none;
  font-size: 14px;
  padding: 5px;
  height: 30px;
  width: 100px;
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
}

@media (max-width: 600px) {
  .sorting-section {
    flex-direction: column;
    height: auto;
    gap: 5px;
  }

  .search-section {
    margin-left: 0px;
  }
}
</style>