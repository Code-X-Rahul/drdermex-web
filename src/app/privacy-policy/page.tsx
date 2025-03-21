import PrivacyPolicy from "@/markdown/privacy-policy.mdx";

const PrivacyPolicyPage = () => {
  return (
    <div
      className="max-w-[1188px] p-5 xl:p-10 mx-auto"
      style={{
        boxShadow: "0px 24px 24px 0px hsla(0, 0%, 0%, 0.1)",
      }}
    >
      <PrivacyPolicy />
    </div>
  );
};

export default PrivacyPolicyPage;
