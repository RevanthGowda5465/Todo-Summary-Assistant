# ✅ Todo Summary Assistant

A full-stack productivity app where users can manage their tasks and get an AI-generated summary of all pending todos sent directly to Slack.

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Spring Boot (Java)
- **Database:** MySQL
- **LLM Integration:** OpenAI GPT-3.5
- **Notifications:** Slack (Incoming Webhooks)

---

## 🚀 Features

- ✅ User Registration & Login
- ✅ Create, Edit, Delete Todos
- ✅ Mark Todos as Completed / Ongoing
- ✅ Set Priority & Due Date
- ✅ Summarize pending todos using OpenAI
- ✅ Send summary to Slack with a single click

---

## 📦 Project Structure
.
├── client/ # React frontend
└── server/ # Spring Boot backend
├── src/
│ ├── Controller/
│ ├── Entity/
│ ├── Repository/
│ ├── Service/
│ └── Application.java

**yaml**

---

## 🔧 Setup Instructions

### 1. 📦 Backend (Spring Boot)

#### ✅ Prerequisites
- Java 17+
- Maven
- MySQL running locally

#### 🛠️ MySQL Setup

```sql
CREATE DATABASE ToDo;

**⚙️ application.properties**
spring.datasource.url=jdbc:mysql://localhost:3306/ToDo
spring.datasource.username=root
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# OpenAI & Slack
openai.api.key=sk-xxxxxxxxxxxxxxxxxxxxxxxxxx
slack.webhook.url=https://hooks.slack.com/services/xxx/yyy/zzz


**▶️ Run the Server**
cd server
mvn clean spring-boot:run


**  2. 🌐 Frontend (React)
**✅ Setup

bash

cd client
npm install
npm start

Make sure the backend is running on http://localhost:8080

**📡 API Endpoints**
Method	Endpoint	Description
POST	/api/users/register	Register a new user
POST	/api/users/login	Login with email/password
GET	/api/users/by-email?email=	Get user by email
GET	/api/todos?userEmail=	Fetch all todos for a user
POST	/api/todos	Create a todo
PUT	/api/todos/{id}	Update a todo
DELETE	/api/todos/{id}	Delete a todo
POST	/api/summarize?userEmail=	Summarize todos & send to Slack

**🤖 OpenAI Integration**
Uses gpt-3.5-turbo via OpenAI API
Add your API key in application.properties:

openai.api.key=sk-xxxxxxxxxxxxxxxxxxxxxxxxxx

If you see a 401 or 429 error:
Make sure your key is valid and has billing enabled
Check usage here: https://platform.openai.com/account/usage

**💬 Slack Integration**
Go to https://api.slack.com/apps → Create App → Add Incoming Webhook
Set the webhook to post to your desired channel
Copy the URL into:
slack.webhook.url=https://hooks.slack.com/services/xxx/yyy/zzz

You can test it via:
GET http://localhost:8080/test-slack

**📁 .env.example**
# Environment Variables Example
OPENAI_API_KEY=sk-your-api-key-here
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
MYSQL_URL=jdbc:mysql://localhost:3306/ToDo
MYSQL_USERNAME=root
MYSQL_PASSWORD=yourpassword

**🖼️ Screenshots**



**🧠 Known Issues**
OpenAI quota exceeded → returns 429 error
Slack webhook misconfigured → messages not delivered

**🙌 Credits**
Built with:

ReactJS
Spring Boot
MySQL
OpenAI API
Slack Webhooks

**🤝 Contributing**
Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

Let me know if you'd like me to package this into a `.md` file for direct upload to your repo!
