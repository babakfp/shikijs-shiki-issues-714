<script>
    export let data
</script>

{#each data.posts as post}
    <svelte:component this={post} />
{/each}
