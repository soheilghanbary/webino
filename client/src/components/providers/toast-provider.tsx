import { Toaster, type ToasterProps } from 'react-hot-toast';

export const ToastProvider = (props: ToasterProps) => <Toaster position="top-center" {...props} />;
