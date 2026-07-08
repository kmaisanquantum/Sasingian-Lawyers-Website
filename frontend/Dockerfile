FROM nginx:alpine
# Copy index.html from the current directory (frontend)
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
