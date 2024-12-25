<!DOCTYPE html>
<html lang="zh-Hant">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <h1>Citybreak戶外用品電商網站</h1>
    <h2>目錄 :</h2>
    <ul>
        <li><a href="#project-description">專案說明</a></li>
        <li><a href="#technology-application">技術應用</a></li>
        <li><a href="#database-design">資料庫設計</a></li>
        <li><a href="#function-description">功能說明</a></li>
    </ul>
    <h2 id="project-description">專案說明 : </h2>
    <li></li>
    <h2 id="technology-application">技術應用 :</h2>
    <ul>
        <li>前端 :
            <ul>
                <li>Vue.js</li>
                <li>JS & jQuery</li>
                <li>Bootstrap</li>
            </ul>
        </li>
        <li>後端 :
            <ul>
                <li>ASP.NET API</li>
                <li>JWT</li>
            </ul>
        </li>
        <li>資料庫 :
            <ul>
                <li>MSSQL</li>
            </ul>
        </li>
        <li>API :
            <ul>
                <li>Google OAuth</li>
            </ul>
        </li>
    </ul>
    <h2 id="database-design">資料庫設計 :</h2>
    <ul>
        <li>保持正規化設計，減少資料重複欄位</li>
        <li>透過建立FK與UQ，維持資料的完整性與唯一性，索引也幫助資料搜尋的效率</li>
    </ul>
    <img src="images/Citybreak_DB.png" alt="資料庫設計圖" style="max-width: 100%; height: auto;">
    <h2 id="function-description">功能說明 :</h2>
    <ul>
        <li>前後端分離：使用 .NET Core API 建立後端服務，前端使用 Vue.js 架構，達成低耦合的架構，便於日後的擴展和維護。</li>
        <li>響應式介面設計：利用 Bootstrap 完成響應式介面設計，提升使用者在不同設備上的瀏覽體驗。</li>
        <li>線上支付功能：串接綠界金融 API，確保支付流程的安全性和順暢，提供使用者便捷且安全的交易體驗。</li>
        <li>Google 快速登入：整合 Google OAuth 提供快速登入功能，簡化註冊流程，提升用戶體驗。</li>
    </ul>
</body>

</html>
