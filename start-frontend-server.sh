clear
echo "[ewsd]: Current folder - '$PWD'"
echo "[ewsd]: Going to frontend directory ..."
cd frontend
echo "[ewsd]: Now in '$PWD'"

echo "[ewsd]: Installing node_modules ..."
# install node modules if any modules are updated
npm install --verbose

# start node server
echo "[ewsd]: Starting FRONTEND server ..."
npm run dev
