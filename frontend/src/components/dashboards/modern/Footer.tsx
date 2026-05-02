export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <p className="text-base text-center text-bodytext font-medium mt-4">
        © {currentYear}{' '}
        <span className="font-semibold">
          Nexus<span className="text-primary">RT</span>
        </span>
        . Designed & Developed by{' '}
        <span className="text-primary font-medium hover:text-primaryemphasis cursor-pointer">
          nofuruu
        </span>{' '}
        untuk Skill Fit Test.
      </p>
    </>
  );
};
