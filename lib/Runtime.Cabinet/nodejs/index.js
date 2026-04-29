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

exports.MODULE_NAME = "Runtme.Cabinet";
const add = rtl.add(__dirname, exports);

add("Runtime.Cabinet.Components.Blocks.CabinetMenu");
add("Runtime.Cabinet.Database.Migrations.CabinetMigration");
add("Runtime.Cabinet.Database.User");
add("Runtime.Cabinet.Database.ModuleDescription");
add("Runtime.Cabinet.Models.CabinetSettings");
add("Runtime.Cabinet.Models.Menu");
add("Runtime.Cabinet.Providers.CabinetProvider");
add("Runtime.Cabinet.CabinetMiddleware");
add("Runtime.Cabinet.ModuleDescription");