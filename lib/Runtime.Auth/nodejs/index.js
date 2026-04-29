/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const use = require("bay-lang").use;
const rtl = use("Runtime.rtl");

exports.MODULE_NAME = "Runtime.Auth";
const add = rtl.add(__dirname, exports);

/* Module Description */
add("Runtime.Auth.ModuleDescription");

/* API */
add("Runtime.Auth.Api.LoginApi");
add("Runtime.Auth.Api.LogoutApi");

/* Components */
add("Runtime.Auth.Components.LoginPage.LoginPage");
add("Runtime.Auth.Components.LoginPage.LoginPageModel");
add("Runtime.Auth.Components.LogoutPage.LogoutPage");
add("Runtime.Auth.Components.LogoutPage.LogoutPageModel");

/* Database */
add("Runtime.Auth.Database.User");
add("Runtime.Auth.Database.Migrations.AuthMigration");

/* Providers */
add("Runtime.Auth.Providers.AuthProvider");

/* Middleware */
add("Runtime.Auth.AuthMiddleware");

/* Models */
add("Runtime.Auth.Models.UserData");
add("Runtime.Auth.Models.UserSettings");
