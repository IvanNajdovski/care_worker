-- wrangler d1 execute acu-react-production-database --file sql/sqlCommand.sql --remote
DROP TABLE IF EXISTS presets_filter_fields;
DROP TABLE IF EXISTS presets;
DROP TABLE IF EXISTS preset_filters;
DROP TABLE IF EXISTS preset_columns;
DROP TABLE IF EXISTS preset_column_roles;


CREATE TABLE presets_filter_fields (
    id TEXT NOT NULL,
    field TEXT,
    preset_endpoint_id TEXT NOT NULL,
    data_type TEXT,
    filter_type TEXT,
    CONSTRAINT preset_endpoint_id FOREIGN KEY (preset_endpoint_id) REFERENCES preset_endpoints(id),
    PRIMARY KEY ("id")
);

CREATE TABLE presets (
    id TEXT NOT NULL,
    name TEXT NOT NULL,
    is_private TINYINT(1) NOT NULL DEFAULT 0 CHECK (is_private IN (0, 1)),
    created_by TEXT,
    created_on DATETIME,
    preset_for TEXT NOT NULL,
    CONSTRAINT preset_for FOREIGN KEY (preset_for) REFERENCES preset_endpoints(id),
    PRIMARY KEY ('id')
);

CREATE TABLE preset_filters (
    id TEXT NOT NULL,
    group_id TEXT NOT NULL,
    parent_group_id TEXT,
    preset_id TEXT NOT NULL,
    filter_field_id TEXT NOT NULL,
    operator TEXT,
    value TEXT,
    CONSTRAINT preset_id FOREIGN KEY (preset_id) REFERENCES presets(id),
    CONSTRAINT filter_field_id FOREIGN KEY (filter_field_id) REFERENCES presets_filter_fields(id),
    PRIMARY KEY ('id')
);

CREATE TABLE preset_columns (
    id TEXT NOT NULL,
    preset_id TEXT NOT NULL,
    field_name TEXT,
    display_name TEXT,
    list_group TEXT,
    data_type TEXT DEFAULT NULL,
    width REAL DEFAULT 150,
    status TEXT DEFAULT NULL,
    sortable TINYINT(1) NOT NULL DEFAULT 0 CHECK (visibility IN (0, 1)),
    sort_order REAL DEFAULT NULL,
    visibility TINYINT(1) NOT NULL DEFAULT 0 CHECK (visibility IN (0, 1)),
    searchable TINYINT(1) NOT NULL DEFAULT 0 CHECK (searchable IN (0, 1)),
    search_type TEXT DEFAULT NULL,
    filterable TINYINT(1) NOT NULL DEFAULT 0 CHECK (filterable IN (0, 1)),
    filter_type TEXT DEFAULT NULL,
    reorderable TINYINT(1) NOT NULL DEFAULT 0 CHECK (reorderable IN (0, 1)),
    resizable TINYINT(1) NOT NULL DEFAULT 0 CHECK (resizable IN (0, 1)),
    linkable TINYINT(1) NOT NULL DEFAULT 0 CHECK (linkable IN (0, 1)),
    link_as_image TINYINT(1) NOT NULL DEFAULT 0 CHECK (linkable IN (0, 1)),
    href_url TEXT DEFAULT NULL,
    href_target TEXT DEFAULT NULL,
    editable TINYINT(1) NOT NULL DEFAULT 0 CHECK (linkable IN (0, 1)),
    editable_type TEXT DEFAULT NULL,
    acu_attribute TEXT DEFAULT NULL,
    CHECK (sort_order IN ('ASC', 'DESC', NULL)),
    CONSTRAINT preset_id FOREIGN KEY (preset_id) REFERENCES presets(id),
    PRIMARY KEY ('id')
);

CREATE TABLE preset_column_roles (
    id TEXT NOT NULL,
    preset_column_id TEXT NOT NULL,
    role_id TEXT NOT NULL,
    role_name TEXT,
    enabled TINYINT(1) NOT NULL DEFAULT 1 CHECK (enabled IN (0, 1)),
    CONSTRAINT preset_column_id FOREIGN KEY (preset_column_id) REFERENCES preset_columns(id),
    PRIMARY KEY ('preset_column_id', 'role_id')
);