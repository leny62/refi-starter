FROM public.ecr.aws/nginx/nginx:1.21.3-alpine
COPY conf/prod/nginx.conf /etc/nginx/nginx.conf
COPY website/dist /usr/share/nginx/html/

COPY assets /usr/share/nginx/html/assets/
COPY assets/favicon.ico /usr/share/nginx/html/