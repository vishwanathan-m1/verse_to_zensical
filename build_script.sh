echo "merging your latest changes to main branch"
git checkout main
git pull origin main
git merge rel/3.2 --no-ff -m "Merge rel/3.2 to main"
git push origin HEAD:main --force

echo "Building Documentation V3.2 ..."
	git checkout rel/3.2
	git pull origin rel/3.2
	
    # git fetch --tags --force
	# git tag -f v9.5
	# git push -f origin v9.5
	# git checkout tags/v9.5
	
mike deploy --push --update-aliases 3.2 latest -t 3.2
# mike set-default --push latest 

git checkout rel/3.2