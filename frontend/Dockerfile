FROM nginx:alpine
# Explicitly copy from the frontend directory
COPY frontend/index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
