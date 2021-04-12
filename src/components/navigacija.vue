<template>
  <nav>
  <ul>
    <li>
      <router-link :to="{ name:'igra_edit' , params:{id:'sdsd'} }">uredi igro sdsd</router-link>
    </li>
    <li>
      <router-link :to="{ name:'igra_new'} ">nova igra</router-link>
    </li>
  </ul>
  </nav>
</template>