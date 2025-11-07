// GitHub/Bitbucket/Gitlab : Version control tool

// To work with Github/bitbucket/gitlab - install git inside your local system

// If the repository is already available

// 1. Clone the repository inside your local system - git clone repo-url. Ex: - git clone https://github.com/Praveenroy05/EdgePOM.git
// 2. Install all the dependencies - npm install - npm install playwright - one time work

// master/main/release - You should not be directly working on this branch
// To check the branch available in your local - git branch

// 3. Create a new branch - featurebranch - git checkout -b branchName
// 4. Develope the test and make any necessary changes inside your local system
// 5. Add all the changes in your local git - git add .
// 6. Commit the changes in your local git - git commit -m "message" Ex: - git commit -m "added dashboard page test"
     // You can rebase your changes with the master branch
     // 6.1 - Move to the master branch - git checkout master
     // 6.2 - Pull all the changes into your local - git pull
     // 6.3 - Move to the feature branch - git checkout featurebranchname
     // 6.4 - Rebase all the changes from master branch to featurebranch - 
     // git rebase origin/master

// 7. Push all the changes to the remote repository - git push -u origin featurebranchname - git push -u origin dashboardPage
// 8. Raise a Pull Request (PR)


// Again when you start wotking for the new requirement

// 9.Switch to master branch - git checkout master - Need to pull all the latest changes inside your local system - git pull
// 10. Follw the same steps from #3 to #8 everytime



// If you are the first person who is developing the framework

// 1. Create Repository inside github 
// 2. git init
// 3. git add .
// 4. git commit -m "first commit"
// 5. git branch -M master
// 6. git remote add origin https://github.com/Praveenroy05/Test.git
// 7. git push -u origin main
// 8. Follow step 3 to step 8 everytime



