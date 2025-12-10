import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  Snackbar,
  Alert,
  TextField,
  MenuItem,
} from "@mui/material";
import { fetchArticles } from "../api/articlesApi.js";
import ArticleList from "../components/Article/ArticleList.jsx";
import LoadingState from "../components/Feedback/LoadingState.jsx";
import ErrorState from "../components/Feedback/ErrorState.jsx";

const ArticlesPage = () => {
  const MIN_LOADING_MS = 1250;
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [topic, setTopic] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const forceDelayNext = useRef(false);

  const loadArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const start = Date.now();
      const response = await fetchArticles({
        page,
        limit,
        topic,
        search,
        sort,
      });
      setArticles(response.data || []);
      setTotal(response.total || 0);
      setTotalPages(response.totalPages || 1);

      const elapsed = Date.now() - start;
      if (forceDelayNext.current && elapsed < MIN_LOADING_MS) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_MS - elapsed)
        );
      }
    } catch (err) {
      setError(err.message);
      setShowToast(true);
    } finally {
      forceDelayNext.current = false;
      setLoading(false);
    }
  }, [page, limit, topic, search, sort]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles, refreshKey]);

  const topics = useMemo(() => {
    const values = articles.map((article) => article.topic).filter(Boolean);
    return Array.from(new Set(values)).slice(0, 6);
  }, [articles]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setPage(1);
  };

  const handleSearchSubmit = () => {
    forceDelayNext.current = true;
    setSearch(searchInput);
    setPage(1);
    setRefreshKey((key) => key + 1);
  };

  const handleTopicChange = (event) => {
    forceDelayNext.current = true;
    setTopic(event.target.value);
    setPage(1);
    setRefreshKey((key) => key + 1);
  };

  const handleSortChange = (event) => {
    forceDelayNext.current = true;
    setSort(event.target.value);
    setRefreshKey((key) => key + 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleRefresh = () => {
    forceDelayNext.current = true;
    setPage(1);
    setRefreshKey((key) => key + 1);
  };

  if (loading) {
    return <LoadingState items={9} />;
  }

  if (error) {
    return (
      <>
        <ErrorState message={error} onRetry={loadArticles} />
        <Snackbar
          open={showToast}
          autoHideDuration={4000}
          onClose={() => setShowToast(false)}
        >
          <Alert severity="error" onClose={() => setShowToast(false)}>
            {error}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          mb: 6,
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          background:
            "linear-gradient(150deg, rgba(92,107,192,0.16), rgba(10,14,39,0.9))",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Stack spacing={2} sx={{ maxWidth: 900 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              color: "#E8EAF6",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Article library
          </Typography>
          <Typography
            sx={{ color: "#B8C1EC", fontSize: "1rem", lineHeight: 1.7 }}
          >
            Explore every piece of AI-generated content. Pick a topic and dive
            into analyses on technology, AI, and innovation.
          </Typography>
          <Stack spacing={2} direction={{ xs: "column", md: "row" }} useFlexGap>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search by title or content"
              value={searchInput}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearchSubmit();
                }
              }}
              fullWidth
              sx={{ maxWidth: 360 }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleSearchSubmit}
              sx={{ minWidth: 120, height: 40 }}
            >
              Okei
            </Button>
            <TextField
              size="small"
              select
              label="Topic"
              value={topic}
              onChange={handleTopicChange}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="">All topics</MenuItem>
              {topics.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              select
              label="Sort"
              value={sort}
              onChange={handleSortChange}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="recent">Most recent</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </TextField>
            <Button
              variant="outlined"
              size="small"
              onClick={handleRefresh}
              sx={{ minWidth: 120, height: 40 }}
            >
              Refresh list
            </Button>
          </Stack>
        </Stack>
      </Box>

      {articles.length ? (
        <Stack spacing={3}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#E8EAF6",
              }}
            >
              {total} {total === 1 ? "article" : "articles"}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                disabled={page === 1}
                onClick={handlePrevPage}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="small"
                disabled={page >= totalPages}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </Stack>
          </Stack>

          <ArticleList articles={articles} />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ color: "#9FA8DA" }}>
              Page {page} of {totalPages}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                disabled={page === 1}
                onClick={handlePrevPage}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="small"
                disabled={page >= totalPages}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            background:
              "linear-gradient(150deg, rgba(92,107,192,0.12), rgba(10,14,39,0.9))",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            textAlign: "center",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Typography variant="h4" sx={{ color: "#E8EAF6" }}>
              No articles published yet
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
              As soon as new AI content is generated, it will appear here
              automatically.
            </Typography>
            <Button variant="outlined" onClick={loadArticles}>
              Reload
            </Button>
          </Stack>
        </Box>
      )}

      <Snackbar
        open={showToast}
        autoHideDuration={4000}
        onClose={() => setShowToast(false)}
      >
        <Alert severity="error" onClose={() => setShowToast(false)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ArticlesPage;
