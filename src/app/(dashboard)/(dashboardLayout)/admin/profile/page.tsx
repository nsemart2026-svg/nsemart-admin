'use client';
import ProfileCard from '@/components/modules/Dashboard/Profile/ProfileCard';
import PasswordChangeForm from '@/components/forms/PasswordChangeForm';
import UpdateProfileCard from '@/components/modules/Dashboard/Profile/UpdateProfileCard';

// import ErrorMessage from "@/components/shared/ErrorMessage";
// import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ProfilePage = () => {
  //   const adminId = useSelector((state) => state.auth.adminId);
  // const { data: adminProfile, isLoading, error } = useGetAdminProfileQuery(adminId);

  // if (isLoading) return <LoadingSpinner/>;
  // if (error) return <ErrorMessage/>;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 py-6">
      <div className="space-y-6">
        {/* <ProfileCard adminProfile={adminProfile} /> */}
        <ProfileCard />
        <PasswordChangeForm />
      </div>
      {/* Profile */}
      <div className="xl:col-span-2">
        {/* <UpdateProfileCard  adminProfile={adminProfile} /> */}
        <UpdateProfileCard />
      </div>
    </div>
  );
};

export default ProfilePage;
