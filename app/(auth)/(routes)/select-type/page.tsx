import { AccountTypeInfo } from "./_components/account-type-info";

const SelectTypePage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-medium">Choose your account type </h1>
        <span className="font-light">be carefull, you can’t change it</span>
      </div>
      <div className="flex gap-x-10 mt-16">
        <AccountTypeInfo
          label="User"
          href="/create"
          description="Become part of our active fitness community, set your goals, and access tools to achieve success."
        />
          <AccountTypeInfo
            label="Gym"
            href="/gym/create"
            description="Manage your fitness facility, attract more clients, and deliver high-quality services to your visitors."
          />
      </div>
    </div>
  );
};

export default SelectTypePage;
