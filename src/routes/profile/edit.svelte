<script context="module">
  import { session } from '$app/stores';
  import { protectedRoute } from '$lib/protectedRoute';
  export async function load({ session }) {
    return protectedRoute(session, {}, null, '/profile/edit');
  }
</script>

<script>
  let user = $session.user;
</script>

<div class="p-3 mb-5">
  <form>
    <div class="form-control">
      <label class="cursor-pointer label">
        <span class="label-text">Is your profile publically visible?</span>
        <input type="checkbox" checked="checked" class="toggle" />
      </label>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Username</span>
      </label>
      <input type="text" placeholder="Username" class="input input-bordered" value={user.userName} />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input type="email" placeholder="Email" class="input input-bordered" value={user.email} />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Phone Number</span>
      </label>
      <input type="email" placeholder="Email" class="input input-bordered" value={user.phoneNumber} />
    </div>
    <button type="submit" class="mt-5 w-full btn py-2 rounded-full focus:outline-none"
      ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>Save</button
    >
  </form>
</div>
<div class="divider" />
<div class="p-3 mb-5">
  <form>
    Upload new Avatar
    <button type="submit" class="mt-5 w-full btn py-2 rounded-full  focus:outline-none"
      ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>Upload</button
    >
  </form>
</div>
