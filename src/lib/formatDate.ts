import { format, formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

export const formatYYYYMMDD = (date: string) => format(new Date(date), 'yyyy.MM.dd', { locale: ja });

export const getAgo = (date: string) => formatDistanceToNow(new Date(date), { addSuffix: true, locale: ja });
