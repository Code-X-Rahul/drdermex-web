import DisclaimerPolicy from "@/markdown/disclaimer-policy.mdx";

const DisclaimerPolicyPage = () => {
  return (
    <div
      className='max-w-7xl p-5 xl:p-10 mx-auto'
      style={{
        boxShadow: "0px 24px 24px 0px hsla(0, 0%, 0%, 0.1)",
      }}
    >
      <DisclaimerPolicy />
    </div>
  );
};

export default DisclaimerPolicyPage;
