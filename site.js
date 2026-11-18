// Static-site helpers (airball Pages). Inert on the dynamic app — every
// block is feature-detected and simply does nothing when its elements are
// absent.
window.SITE_BASE = "/airball-pages/";

function staticSortRows(tbody, key, dir) {
    var rows = Array.prototype.slice.call(tbody.querySelectorAll("tr"));
    rows.sort(function(a, b) {
        var va = parseFloat(a.getAttribute("data-" + key)) || 0;
        var vb = parseFloat(b.getAttribute("data-" + key)) || 0;
        return dir === "desc" ? vb - va : va - vb;
    });
    rows.forEach(function(r) { tbody.appendChild(r); });
}

document.addEventListener("DOMContentLoaded", function() {
    // League filter (Home, Scores, Team Stats, Predictions, Standings):
    // toggles any element carrying a data-league attribute. Combined with
    // the scores team filter when both are present.
    var leagueFilter = document.getElementById("league-filter");
    var teamFilter = document.getElementById("team-filter");

    function applyFilters() {
        var league = leagueFilter ? leagueFilter.value : "All";
        var team = teamFilter ? teamFilter.value : "All";
        Array.prototype.forEach.call(document.querySelectorAll("[data-league]"), function(el) {
            var showLeague = league === "All" || el.getAttribute("data-league") === league;
            var showTeam = true;
            if (teamFilter && el.hasAttribute("data-teams")) {
                var teams = el.getAttribute("data-teams").split("|");
                showTeam = team === "All" || teams.indexOf(team) !== -1;
            }
            el.style.display = (showLeague && showTeam) ? "" : "none";
        });
    }

    if (leagueFilter) leagueFilter.addEventListener("change", applyFilters);
    if (teamFilter) teamFilter.addEventListener("change", applyFilters);
});
