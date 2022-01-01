<script>
  import { page } from '$app/stores';
  const email = $page.query.get('e');
</script>

<svelte:head>
  <title>Reset Password • Kapowey!</title>
</svelte:head>

Proceed with a password reset for email {email}.
