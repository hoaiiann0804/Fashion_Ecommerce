import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
const StatsCard = ({ title, value, description, icon: Icon, color = "default" }) => {
    const colorClasses = {
      default: "text-muted-foreground",
      yellow: "text-yellow-500",
      red: "text-red-500"
    };
  
    const valueClasses = {
      default: "text-2xl font-bold",
      yellow: "text-2xl font-bold text-yellow-600", 
      red: "text-2xl font-bold text-red-600"
    };
  
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className={`h-4 w-4 ${colorClasses[color]}`} />
        </CardHeader>
        <CardContent>
          <div className={valueClasses[color]}>{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    );
  };
  
  export default StatsCard;