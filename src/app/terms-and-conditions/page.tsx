import TermsAndConditions from "@/markdown/terms-and-conditions.mdx";

const TermsAndConditionsPage = () => {
  return (
    <div
      className='max-w-7xl p-5 xl:p-10 mx-auto'
      style={{
        boxShadow: "0px 24px 24px 0px hsla(0, 0%, 0%, 0.1)",
      }}
    >
      <TermsAndConditions />
    </div>
  );
};

export default TermsAndConditionsPage;
