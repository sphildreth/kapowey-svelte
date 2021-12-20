<script context="module">
  import { protectedRoute } from '$lib/protectedRoute';

  export async function load({ session }) {
    return protectedRoute(session, {}, null, '/profile/edit');
  }
</script>

This is the edit profile page.
