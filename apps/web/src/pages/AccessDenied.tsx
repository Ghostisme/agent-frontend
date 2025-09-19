import { useNavigate } from "react-router-dom";
import Button from "@nexus/ui/components/Button/index"
export default function AccessDenied() {
  const navigate = useNavigate();
  navigate
  return (
    <div className="p-6">
      <span className="text-red-600">无权限访问</span>
      <Button type='primary' color='primary' variant='primary' onClick={() => navigate('/login')}>登录</Button>
      <Button variant="default" className="flex-1 sm:flex-none">
        主要操作
      </Button>
    </div>
  );
}