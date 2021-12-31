<script context="module">
  import { protectedRoute } from '$lib/protectedRoute';
  export async function load({ session }) {
    return protectedRoute(session, {}, null, '/notifications');
  }
</script>

Notification stuff goes here
