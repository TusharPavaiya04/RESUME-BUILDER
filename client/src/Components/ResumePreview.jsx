import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";
import ATSTemplate from "./ATSTemplate";
import CardTemplate from "./CardTemplate";
import GridTemplate from "./GridTemplate";

const ResumePreview = ({ data, template, accentColor }) => {


  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;

      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;

      case "professional":
        return <ProfessionalTemplate data={data} accentColor={accentColor} />;

      case "ats":
        return <ATSTemplate data={data} accentColor={accentColor} />;

      case "card":
        return <CardTemplate data={data} accentColor={accentColor} />;

      case "grid":
        return <GridTemplate data={data} accentColor={accentColor} />;

      default:
        return <ModernTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div id='resume' className="bg-white shadow rounded-lg">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;