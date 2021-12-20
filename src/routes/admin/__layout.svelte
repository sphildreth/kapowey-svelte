<script context="module">
  import { protectedRoute } from '$lib/protectedRoute';

  export async function load({ session }) {
    return protectedRoute(session, {}, 'isEditor');
  }
</script>

<slot />
